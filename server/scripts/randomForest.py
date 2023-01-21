import pandas as pd
import numpy as np
import json
import sys
import warnings
from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
if sys.argv[1] != 'LOL_Icon':
    f  = open('./scripts/randomForestData.txt','r')
    file_content = f.read()
    df = json.loads(file_content)
    df = pd.DataFrame(df)
    df = df[df.columns[~df.columns.isin(['lane','individualPosition','championName','id','GameID','GameMode','summoner1Id','summoner2Id','summonerId'])]]
    df['win'] = np.where(df['win'] == "TRUE" , 1, 0)
    df['teamEarlySurrendered'] = np.where(df['teamEarlySurrendered'] == "TRUE" , 1, 0)
    df['gameEndedInSurrender'] = np.where(df['gameEndedInSurrender'] == "TRUE" , 1, 0)
    df['firstBloodKill'] = np.where(df['firstBloodKill'] == "TRUE" , 1, 0)
    df['firstBloodAssist'] = np.where(df['firstBloodAssist'] == "TRUE" , 1, 0)
    with warnings.catch_warnings():
        warnings.filterwarnings(
            "ignore",
            category=FutureWarning,
            message=(
                ".*will attempt to set the values inplace instead of always setting a new array. "
                "To retain the old behavior, use either.*"
            )
        )
        df.loc[:, df.columns != 'win'] = df.astype('int64')
        df.loc[:, df.columns == 'win'] = df.astype('bool')
        df.loc[:, df.columns == 'teamEarlySurrendered'] = df.astype('bool')
        df.loc[:, df.columns == 'gameEndedInSurrender'] = df.astype('bool')
        df.loc[:, df.columns == 'firstBloodKill'] = df.astype('bool')
        df.loc[:, df.columns == 'firstBloodAssist'] = df.astype('bool')

    X = df[df.columns[~df.columns.isin(['win'])]]
    y = df['win']
    X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.3)
    clf = RandomForestClassifier(n_estimators=500)
    clf.fit(X_train,y_train)
    y_pred = clf.predict(X_test)
    print("Accuracy of Random Forest Classifier model :", round(metrics.accuracy_score(y_test,y_pred),5), end=" and ")
    importances = clf.feature_importances_
    sorted_indices = np.argsort(importances)[::-1]
    print("the top five features for this Random Forest Classifier model are:", end=" ")
    for i in range(5):
            if i != 4:
                    print(X.columns[sorted_indices][i] , end= ", ")
            else:
                    print(X.columns[sorted_indices][i])
    f.close()
else:
    print("This web app will focus on displaying each champions data under the Table button, displaying ")
    print("a bar chart of Avg/Sum depending on user option under the Graph button and running ")
    print("a Random Forest model using a python script.")




