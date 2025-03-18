import os
import mysql.connector
from moviepy.editor import VideoFileClip

folder_path = '/Users/boutyarzisset/Documents/uploadServer/Videos_annotation/Validated_sequences/'
mydb = mysql.connector.connect(host='localhost', user='root', password='root', database='annot', port='3306')

mycursor = mydb.cursor(buffered=True, dictionary=True)

def getCampaignAutoId(name):
    campaignAutoQuery = """
        SELECT id FROM campaigns WHERE name = %s
    """

    dataRequete = (name,)

    mycursor.execute(campaignAutoQuery, dataRequete)
    data = mycursor.fetchall()
    mydb.commit()
    if len(data) > 0:
        return data[0]['id']
    else:
        return None


def getAudioId(name):
    campaignAudioNameQuery = """ SELECT id FROM audios WHERE name= %s"""

    dataRequete = (name,)

    mycursor.execute(campaignAudioNameQuery, dataRequete)
    data = mycursor.fetchall()
    mydb.commit()
    if len(data) > 0:
        return data[0]['id']
    else:
        return None

def getCampaignAutoName(id):
    campaignNameQuery = """ SELECT name FROM campaigns WHERE id= %s"""

    dataRequete = (id,)

    mycursor.execute(campaignNameQuery, dataRequete)
    data = mycursor.fetchall()
    mydb.commit()
    if len(data) > 0:
        return data[0]['name']
    else:
        return None


def getAudiosAutoId(path):
    audioAutoQuery = """
        SELECT id FROM audios WHERE name = %s
    """

    dataRequete = (path,)
    mycursor.execute(audioAutoQuery, dataRequete)
    data = mycursor.fetchall()
    mydb.commit()
    return data


def getEmotionsId():
    emotionIdQuery = """
        SELECT id FROM emotions 
    """
    mycursor.execute(emotionIdQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data


def getSliderAutoId():
    sliderAutoQuery = """
        SELECT id FROM sliderConfigurations WHERE name = 'auto'
    """
    mycursor.execute(sliderAutoQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data[0]['id']


def getTimeAutoId():
    timeAutoQuery = """
        SELECT id FROM timeIntervals WHERE label = 'auto'
    """
    mycursor.execute(timeAutoQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data[0]['id']


def getProfileId():
    profileQuery = """
        SELECT id FROM profiles WHERE name = 'positif' OR name = 'négatif'
    """
    mycursor.execute(profileQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data


def getPositiveProfile():
    positiveProfileQuery = """
            SELECT id FROM profiles WHERE name = 'positif'

    """
    mycursor.execute(positiveProfileQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data[0]['id']


def getNegativeProfile():
    negativeProfileQuery = """
            SELECT id FROM profiles WHERE name = 'négatif'

    """
    mycursor.execute(negativeProfileQuery, )
    data = mycursor.fetchall()
    mydb.commit()
    return data[0]['id']

def setDurationOfVideo(audioName, duration):
    durationQuery = """UPDATE audios set duration = %s where name = %s"""
    inputData = (duration, audioName)
    mycursor.execute(durationQuery, inputData)
    mydb.commit()

# insertion des audios présents dans folder_path
for path, dirs, files in os.walk(folder_path):
    for i in dirs:
        sliderId = getSliderAutoId()
        timeId = getTimeAutoId()
        campaignQueryPerFolder = 'INSERT IGNORE INTO campaigns(name, emotionalAnalysis, audioTranscription, ended, ' \
                                 'emotionalAnalysisSliderConfigurationId, emotionalAnalysisTimeIntervalId, createdBy) ' \
                                 'VALUES (%s, %s, %s, %s, %s, %s, 1)'
        val2 = (i, 1, 0, 0, sliderId, timeId)
        mycursor.execute(campaignQueryPerFolder, val2)
        mydb.commit()

        # Creer campagne pour chaque nom de dossier (i)
        campaignId = getCampaignAutoId(i)
        campaignName = getCampaignAutoName(campaignId)
        campaignUserQuery = 'INSERT IGNORE INTO campaignUsers(campaignId, UserId) VALUES (%s, %s)'

        val = (campaignId, 1)
        mycursor.execute(campaignUserQuery, val)
        mydb.commit()

        for filename in os.listdir(folder_path + i):

            #f = os.listdir(folder_path + i)

            extension = os.path.splitext(filename)
            longPath = folder_path + i + '/' + filename
            clip = VideoFileClip(longPath)
            #setDurationOfVideo(filename, clip.duration)

            if extension[1] == '.mp4':
                query = 'INSERT IGNORE INTO audios(name, size, link, duration) VALUES (%s, %s, %s, %s)'
                val = (filename, 16, longPath, clip.duration)
                mycursor.execute(query, val)
                mydb.commit()
                print(mycursor.rowcount, " inserted")
            else:
                print('This file is not .mp4')

        for f in os.listdir(folder_path + i):
            audioId = getAudioId(f)
            campaignId = getCampaignAutoId(i)

            # Inserer les vidéos dans campagnes correspondantes
            campaignAudioQuery = 'INSERT IGNORE INTO campaignAudios(campaignId, audioId) VALUES (%s, %s)'
            val = (campaignId, audioId)
            mycursor.execute(campaignAudioQuery, val)
            mydb.commit()
            print(mycursor.rowcount, " inserted")

        # lui attribuer des dimensions
        emotionsId = getEmotionsId()

        for r in emotionsId:
            campaignAudioQuery = 'INSERT IGNORE INTO campaignEmotions(campaignId, EmotionId) VALUES (%s, %s)'
            val = (campaignId, r['id'])
            mycursor.execute(campaignAudioQuery, val)
            mydb.commit()
            print(mycursor.rowcount, " inserted")

        # lui attribuer des profiles
        profilesId = getProfileId()

        for r in profilesId:
            profileQuery = 'INSERT IGNORE INTO campaignProfiles(campaignId, profileId) VALUES (%s, %s)'
            val = (campaignId, r['id'])
            mycursor.execute(profileQuery, val)
            mydb.commit()
            print(mycursor.rowcount, " inserted")

# lui attribuer des slider value
sliderQuery = 'INSERT IGNORE INTO sliderConfigurations(name, minScale, maxScale, startValue, tickInterval) VALUES (' \
              '%s, %s, %s, %s, %s) '
val = ('auto', 0, 1, 0.5, 0.01)
mycursor.execute(sliderQuery, val)
mydb.commit()
print(mycursor.rowcount, " inserted")

# time interval
timeQuery = 'INSERT IGNORE INTO timeIntervals(label, value) VALUES (%s, %s)'
val = ('auto', 100)
mycursor.execute(timeQuery, val)
mydb.commit()
print(mycursor.rowcount, " inserted")

# creer des dimensions
mycursor.executemany(
    """
        INSERT IGNORE INTO emotions(name, description) VALUES (%s, %s)
    """,
    [
        ('Éveil', 'À quel point le participant semble endormi ou éveillé ?'),
        ('Nouveauté', 'À quel point le participant ressent ce qui se passe comme prédictible ou inattendu ?'),
        ('Agrément intrinsèque', 'À quel point le participant exprime du déplaisir ou du plaisir ?'),
        ('Conductivité', 'À quel point ce qui se passe semble être ce que veut le participant ?'),
        ('Maîtrise', 'À quel point le participant semble pouvoir faire face à ce qui se passe ?')
    ]
)

# creer des profiles
mycursor.executemany(
    """
        INSERT IGNORE INTO profiles(name, description) VALUES (%s, %s)    """,
    [
        ('positif', 'labels positifs'),
        ('négatif', 'labels négatifs')
    ]
)

# creer des labels
negativeProfile = getNegativeProfile()
positiveProfile = getPositiveProfile()

print(negativeProfile)
mycursor.executemany(
    """
        INSERT IGNORE INTO profileLabels(label, profileId) VALUES (%s, %s)
    """,
    [
        ('Frustré', negativeProfile),
        ('Déçu', negativeProfile),
        ('Désespéré', negativeProfile),
        ('Anxieux', negativeProfile),
        ('Triste', negativeProfile),
        ('Gêné', negativeProfile),
        ('Coupable', negativeProfile),
        ('Honteux', negativeProfile),
        ('Ennuyé', negativeProfile),
        ('Frustré', negativeProfile),
        ('Vexé', negativeProfile),
        ('En colère', negativeProfile),
        ('Agité', negativeProfile),
        ('Curieux', positiveProfile),
        ('Intéressé', positiveProfile),
        ('Impatient', positiveProfile),
        ('Etonné', positiveProfile),
        ('Satisfait', positiveProfile),
        ('Détendu', positiveProfile),
        ("Plein d'espoir", positiveProfile),
        ('Confiant', positiveProfile),
        ('Fier', positiveProfile),
        ('Excité', positiveProfile),
        ('Joyeux', positiveProfile),
        ('Détendu', positiveProfile),
    ]
)
