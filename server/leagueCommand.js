const Table = require('./Table')

class leagueCommand extends Table{
    constructor() {
        super();
    }

    championName(){
        return this.all(
            `SELECT DISTINCT championName FROM dataset ORDER BY championName ASC`);
        }

    viewAll(){
        return this.all(`SELECT * FROM dataset ORDER BY championName ASC`);
        }

    champData(Name){
        return this.all(`SELECT * FROM dataset WHERE championName=?`,[Name])
    }

    champGraph(Champ){
        return this.all(
            `
            SELECT individualPosition, assists, Baron_Kills, Champion_EXP, 
            Champion_Level, Objective_Damage, Damage_selfMitigated,
            Deaths, Dragon_Kills, FirstBlood_Assits, First_Blood,
            Surrendered, Gold_Earned, Gold_Spent, Lane, Enemy_Inhibitor_Destroyed,
            Kills, Crit_Strike, Killing_Spree, Time_Alive, Magic_Damage, Objective_Stolen,
            Physical_Damage, Physical_Damage_Taken, Q_Casted, W_Casted, E_Casted, R_Casted,
            D_Casted, F_Casted, Time_CC_Others, Game_Total_Time, Total_Damage_To_champs,
            Shelded_Damage_On_Teammates, Total_Heal, Total_Heal_Towards_Teammates, Total_Minions_Killed,
            Total_Time_Dead, True_Damage_Towards_Champs, True_Damage_Taken, Turret_Takedowns,
            Turrets_Lost, Vision_Score, Vision_Ward_Bought, Wards_Destroyed, Wards_Placed, Wins 
            FROM (
                SELECT individualPosition, 
                    FLOOR(AVG(assists)) AS assists,
                    FLOOR(AVG(baronKills)) AS Baron_Kills,
                    FLOOR(AVG(champExperience)) AS Champion_EXP,
                    FLOOR(AVG(champLevel)) AS Champion_Level,
                    FLOOR(AVG(damageDealtToObjectives)) AS Objective_Damage,
                    FLOOR(AVG(damageSelfMitigated)) AS Damage_selfMitigated,
                    FLOOR(AVG(deaths)) AS Deaths,
                    FLOOR(AVG(dragonKills)) AS Dragon_Kills,
                    FLOOR(AVG(firstBloodAssist)) AS FirstBlood_Assits,
                    FLOOR(AVG(firstBloodKill)) AS First_Blood,
                    COUNT(CASE WHEN teamEarlySurrendered='TRUE' THEN 1 END) AS Surrendered,
                    FLOOR(AVG(goldEarned)) AS Gold_Earned,
                    FLOOR(AVG(goldSpent)) AS Gold_Spent,
                    COUNT(individualPosition) AS Lane,
                    SUM(inhibitorKills) AS Enemy_Inhibitor_Destroyed,
                    FLOOR(AVG(kills)) AS Kills,
                    FLOOR(AVG(largestCriticalStrike)) AS Crit_Strike,
                    FLOOR(AVG(largestKillingSpree)) AS Killing_Spree,
                    FLOOR(AVG(longestTimeSpentLiving)) AS Time_Alive,
                    FLOOR(AVG(magicDamageDealtToChampions)) AS Magic_Damage,
                    SUM(objectivesStolen) AS Objective_Stolen,
                    FLOOR(AVG(physicalDamageDealtToChampions)) AS Physical_Damage,
                    FLOOR(AVG(physicalDamageTaken)) AS Physical_Damage_Taken,
                    FLOOR(AVG(spell1Casts)) AS Q_Casted,
                    FLOOR(AVG(spell2Casts)) AS W_Casted,
                    FLOOR(AVG(spell3Casts)) AS E_Casted,
                    FLOOR(AVG(spell4Casts)) AS R_Casted,
                    FLOOR(AVG(summoner1Casts)) AS D_Casted,
                    FLOOR(AVG(summoner2Casts)) AS F_Casted,
                    FLOOR(AVG(timeCCingOthers)) AS Time_CC_Others,
                    FLOOR(AVG(timePlayed)) AS Game_Total_Time,
                    FLOOR(AVG(totalDamageDealtToChampions)) AS Total_Damage_To_Champs,
                    FLOOR(AVG(totalDamageShieldedOnTeammates)) AS Shelded_Damage_On_Teammates,
                    FLOOR(AVG(totalHeal)) AS Total_Heal,
                    FLOOR(AVG(totalHealsOnTeammates)) AS Total_Heal_Towards_Teammates,
                    FLOOR(AVG(totalMinionsKilled)) AS Total_Minions_Killed,
                    FLOOR(AVG(totalTimeSpentDead)) AS Total_Time_Dead,
                    FLOOR(AVG(trueDamageDealtToChampions)) AS True_Damage_Towards_Champs,
                    FLOOR(AVG(trueDamageTaken)) AS True_Damage_Taken,
                    FLOOR(AVG(turretTakedowns)) AS Turret_Takedowns,
                    FLOOR(AVG(turretsLost)) AS Turrets_Lost, 
                    FLOOR(AVG(visionScore)) AS Vision_Score,
                    FLOOR(AVG(visionWardsBoughtInGame)) AS Vision_Ward_Bought,
                    FLOOR(AVG(wardsKilled)) AS Wards_Destroyed,
                    FLOOR(AVG(wardsPlaced)) AS Wards_Placed,
                    COUNT(CASE WHEN win = 'TRUE' THEN 1 END) AS Wins
                FROM dataset 
                WHERE championName=? 
                GROUP BY individualPosition
                HAVING count(CASE WHEN individualPosition IN ('TOP', 'MIDDLE', 'JUNGLE', 'BOTTOM' , 'UTILITY') THEN 1 END) >= 0 
                    AND 
                    count(CASE WHEN individualPosition NOT IN ('TOP', 'MIDDLE', 'JUNGLE', 'BOTTOM', 'UTILITY') THEN 1 END) = 0 
                )
                ORDER BY
                CASE
                    WHEN individualPosition = 'TOP' THEN 1
                    WHEN individualPosition = 'MIDDLE' THEN 2
                    WHEN individualPosition = 'JUNGLE' THEN 3
                    WHEN individualPosition = 'BOTTOM' THEN 4
                    WHEN individualPosition = 'UTILITY' THEN 5
                    ELSE 6
                END`,[Champ])
    }
}



// export default leagueCommand;
module.exports = leagueCommand;