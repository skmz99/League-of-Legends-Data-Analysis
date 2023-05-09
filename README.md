# League-of-Legends-Data-Analysis
This is a personal project where I'll be using React js for front-end and node js for backend. 
The dataset is from kaggle: https://www.kaggle.com/datasets/prestonrobertson7/league-of-legends-data-9292022 where there are a hundred-thousand records
with multple variables, however the dataset used in this application is a modified version with simple changes as in removing a single instance of a 
Aram match and adding an Id column to identify each row.

# About 
Web application that uses a modified version of https://www.kaggle.com/datasets/prestonrobertson7/league-of-legends-data-9292022 to display its records
into a table, along with displaying graphs for each champion based on a selected variable showing their averages/sums on the respective lanes they were taken. The application allows the user
to select a champion they would want to view and sends that champion's records from the dataset to a python script where a Random Forest Classifier will
take those records and use the variable 'Win' to display the accuarcy of the model with the top five features along side it.

# How to start
Within the application folder directory use in terminal `npm run begin ` this will concurrently start the application along with the backend.

# demo video
https://github.com/skmz99/League-of-Legends-Data-Analysis/assets/83142392/c32de62f-258d-42a0-b74a-ed59817065ed

