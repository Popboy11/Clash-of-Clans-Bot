const Discord = require('discord.js');
const bot = new Discord.Client();
const {Client, MessageEmbed} = require('discord.js')
const COC_API_TOKEN = "";
const clashApi = require('clash-of-clans-api')
const fs = require("fs");

let client = clashApi({
  token: COC_API_TOKEN // Optional, can also use COC_API_TOKEN env variable
});

var playerTag;
var playerName;
var playerTownHallLevel;
var playerTownHallWeaponsLevel;
var playerXPLevel;
var playerTrophies;
var playerTopTrophies;
var playerWarStars;
var playerAttackWins;
var playerDefenseWins;
var playerBuilderHallLevel;
var playerBuilderBaseTrophies;
var playerTopBuilderBaseTrophies;
var playerBuilderBaseBattleWins;
var playerTroopsDonated;
var playerTroopsReceived;
var playerTroopsRatio;
var playerLeagueName;
var playerLeaguePicture;
var playerGoldGrab;
var playerElixirEscapade;
var playerMultiplayerBattlesWon;
var playerMultiplayerDefensesWon;
var playerTotalTroopsDonated;
var playerHeroicHeist;
var playerSpellsDonated;
var playerClanGamePoints;
var playerCWLStars;
var playerSeasonPoints;
var playerLabelsOne;
var playerLabelsTwo;
var playerLabelsThree;
var playerTownHallPicture;
var playerLeagueBadge;
var playerTownHallIcon;
var playerBuilderHallIcon;
var playerCampaignStars;
var playerObstaclesRemoved;
var playerLabelsOneIcon;
var playerLabelsTwoIcon;
var playerLabelsThreeIcon;
var playerLegendTrophies;
var playerLegendPreviousSeasonDate;
var playerLegendPreviousSeasonRank;
var playerLegendPreviousSeasonTrophies;
var playerLegendBestSeasonDate;
var playerLegendBestSeasonRank;
var playerLegendBestSeasonTrophies;
var playerLegendCurrentSeasonRank;
var playerLegendCurrentSeasonTrophies;
var playerVersusBestSeasonDate;
var playerVersusBestSeasonRank;
var playerVersusBestSeasonTrophies;
var playerVersusPreviousSeasonDate;
var playerVersusPreviousSeasonRank;
var playerVersusPreviousSeasonTrophies;
var playerTroopsDonatedDisplay;
var playerTroopsReceivedDisplay;
var playerTroopsRatioApproval;
var playerClanName;
var playerClanTag;
var playerClanLevel;
var playerClanRole;
var playerLegendStatsUnlocked = 0;
var playerBuilderStatsUnlocked = 0;
var playerFunctionAttempt;
var timetoRemind;
var timeNumber;
var timeStarted;
var timerGoing = 1;
var timeCheck;
var newTimetoRemind;
var channelTimer;
var personTimer;
var timerMessage;
var currentReminderCache;
var numberOfTimers;
var timerUnitCache;
var timerCorrectFormat = 0;
var playerSyncDiscord;
var playerIdTried;
var playerRestOfMessage;
var tryUserIdPlayer;
var personThatSentMessage;
var messageChannelSent;
var playerClanAttempt;
var clanRestOfMessage;
var clanCommandAuthor;
var channelSentIn;

async function showPlayerInfo(tag) {
  try {
    const playerInfo = await client.playerByTag(tag)
    var parseData = JSON.parse(JSON.stringify(playerInfo))
    //console.log(parseData)
    playerName = parseData['name']
    playerTag = parseData['tag']//.toUpperCase()
    playerTownHallLevel = parseData['townHallLevel']
    if (parseData['townHallWeaponLevel'] > 0) {
    playerTownHallWeaponsLevel = parseData['townHallWeaponLevel']
    } else {
        playerTownHallWeaponsLevel = 0
    }
    playerXPLevel = parseData['expLevel']
    playerTrophies = parseData['trophies'].toLocaleString("en")
    playerTopTrophies = parseData['bestTrophies'].toLocaleString("en")
    playerWarStars = parseData['warStars'].toLocaleString("en")
    playerAttackWins = parseData['attackWins']
    playerDefenseWins = parseData['defenseWins']
    playerBuilderHallLevel = parseData['builderHallLevel']
    playerBuilderBaseTrophies = parseData['versusTrophies'].toLocaleString("en")
    playerTopBuilderBaseTrophies = parseData['bestVersusTrophies'].toLocaleString("en")
    playerBuilderBaseBattleWins = parseData['versusBattleWins']
    playerTroopsDonated = parseData['donations']
    playerTroopsReceived = parseData['donationsReceived']
    playerTroopsDonatedDisplay = parseFloat(parseData['donations']).toLocaleString("en")
    playerTroopsReceivedDisplay = parseFloat(parseData['donationsReceived']).toLocaleString("en")
    if (playerTroopsReceived > 0) {
    playerTroopsRatio = (playerTroopsDonated / playerTroopsReceived).toFixed(3)
    } else {
        playerTroopsRatio = 0
    }
    if (parseData['league']) {
        playerLeagueName = parseData['league']['name']
        playerLeaguePicture = parseData['league']['iconUrls']['medium']
    } else {
        playerLeagueName = 'Unranked'
        playerLeagueBadge = '<:Unranked_League:729427475808911383>'
    }
    playerGoldGrab = parseFloat(parseData['achievements'][5]['completionInfo'].substring(19)).toLocaleString("en")
    playerElixirEscapade = parseFloat(parseData['achievements'][6]['completionInfo'].substring(21)).toLocaleString("en")
    playerMultiplayerBattlesWon = parseFloat(parseData['achievements'][12]['completionInfo'].substring(31)).toLocaleString("en")
    playerMultiplayerDefensesWon = parseFloat(parseData['achievements'][13]['completionInfo'].substring(20)).toLocaleString("en")
    playerTotalTroopsDonated = parseFloat(parseData['achievements'][14]['completionInfo'].substring(24)).toLocaleString("en")
    playerHeroicHeist = parseFloat(parseData['achievements'][16]['completionInfo'].substring(26)).toLocaleString("en")
    playerSpellsDonated = parseFloat(parseData['achievements'][23]['completionInfo'].substring(30)).toLocaleString("en")
    playerClanGamePoints = parseFloat(parseData['achievements'][31]['completionInfo'].substring(24)).toLocaleString("en")
    playerCWLStars = parseData['achievements'][33]['completionInfo'].substring(51)
    playerSeasonPoints = parseFloat(parseData['achievements'][35]['completionInfo'].substring(31)).toLocaleString("en")
    playerCampaignStars = parseData['achievements'][1]['completionInfo'].substring(23)
    playerObstaclesRemoved = parseFloat(parseData['achievements'][3]['completionInfo'].substring(25)).toLocaleString("en")
    if (parseData ['clan']) {
        playerClanName = parseData['clan']['name']
        playerClanRole = parseData['role'].capitalize()
        playerClanLevel = parseData['clan']['clanLevel']
        playerClanTag = parseData['clan']['tag']
    } else {
        playerClanTag = 'Not in a Clan!'
    }
    if (parseData ['labels'] != '') {
        playerLabelsOne = parseData['labels'][0]['name']
        playerLabelsTwo = parseData['labels'][1]['name']
        playerLabelsThree = parseData['labels'][2]['name']
    } else {
        playerLabelsOne = 'No Label'
        playerLabelsTwo = 'No Label'
        playerLabelsThree = 'No Label'
    }
    if (parseData['legendStatistics']) {
        playerLegendStatsUnlocked = 1;
        if (parseData['legendStatistics']['legendTrophies']) {
            playerLegendTrophies = parseData['legendStatistics']['legendTrophies'].toLocaleString("en")
        } else {
            playerLegendTrophies = null;
        }
        if (parseData['legendStatistics']['bestVersusSeason']) {
            playerVersusBestSeasonDate = parseData['legendStatistics']['bestVersusSeason']['id']
            playerVersusBestSeasonRank = parseData['legendStatistics']['bestVersusSeason']['rank'].toLocaleString("en")
            playerVersusBestSeasonTrophies = parseData['legendStatistics']['bestVersusSeason']['trophies'].toLocaleString("en")
        } else {
            playerVersusBestSeasonDate = null;
            playerVersusBestSeasonRank = null;
            playerVersusBestSeasonTrophies = null;
        }
        if (parseData['legendStatistics']['previousVersusSeason']) {
            playerVersusPreviousSeasonDate = parseData['legendStatistics']['previousVersusSeason']['id']
            playerVersusPreviousSeasonRank = parseData['legendStatistics']['previousVersusSeason']['rank'].toLocaleString("en")
            playerVersusPreviousSeasonTrophies = parseData['legendStatistics']['previousVersusSeason']['trophies'].toLocaleString("en")
        } else {
            playerVersusPreviousSeasonTrophies = null;
        }
        if (parseData['legendStatistics']['currentSeason']['rank']) {
            playerLegendCurrentSeasonRank = parseData['legendStatistics']['currentSeason']['rank'].toLocaleString("en")
            playerLegendCurrentSeasonTrophies = parseData['legendStatistics']['currentSeason']['trophies'].toLocaleString("en")
        } else {
            playerLegendCurrentSeasonTrophies = null;
        }
        if (parseData['legendStatistics']['bestSeason']) {
            playerLegendBestSeasonRank = parseData['legendStatistics']['bestSeason']['rank'].toLocaleString("en")
            playerLegendBestSeasonTrophies = parseData['legendStatistics']['bestSeason']['trophies'].toLocaleString("en")
            playerLegendBestSeasonDate = parseData['legendStatistics']['bestSeason']['id']
        } else {
            playerLegendBestSeasonTrophies = null;
        }
        if (parseData['legendStatistics']['previousSeason']) {
            playerLegendPreviousSeasonRank = parseData['legendStatistics']['previousSeason']['rank'].toLocaleString("en")
            playerLegendPreviousSeasonTrophies = parseData['legendStatistics']['previousSeason']['trophies'].toLocaleString("en")
            playerLegendPreviousSeasonDate = parseData['legendStatistics']['previousSeason']['id']
        } else {
            playerLegendPreviousSeasonTrophies = null;
        }
    } else {
        playerLegendStatsUnlocked = 0;
    }
        switch (playerTownHallLevel) {
        case 1:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/f/fd/Town_Hall1.png/revision/latest/scale-to-width-down/100?cb=20170827034930';
        playerTownHallIcon = '<:Town_Hall1:729433664710246452>';
        break;
        case 2:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/7/7d/Town_Hall2.png/revision/latest/scale-to-width-down/100?cb=20170827050036';
        playerTownHallIcon = '<:Town_Hall2:729433665360232478>';
        break;
        case 3:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/d/dd/Town_Hall3.png/revision/latest/scale-to-width-down/100?cb=20170827050050';
        playerTownHallIcon = '<:Town_Hall3:729433665397981184>';
        break;
        case 4:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/e/e7/Town_Hall4.png/revision/latest/scale-to-width-down/100?cb=20170827050104';
        playerTownHallIcon = '<:Town_Hall4:729433665246855210>';
        break;
        case 5:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/a/a3/Town_Hall5.png/revision/latest/scale-to-width-down/100?cb=20170827050118';
        playerTownHallIcon = '<:Town_Hall5:729433665406500884>';
        break;
        case 6:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/5/52/Town_Hall6.png/revision/latest/scale-to-width-down/100?cb=20170827050220';
        playerTownHallIcon = '<:Town_Hall6:729433665477673050>';
        break;
        case 7:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/7/75/Town_Hall7.png/revision/latest/scale-to-width-down/100?cb=20170827051024';
        playerTownHallIcon = '<:Town_Hall7:729433667142680726>';
        break;
        case 8:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/f/fa/Town_Hall8.png/revision/latest/scale-to-width-down/100?cb=20170827051039';
        playerTownHallIcon = '<:Town_Hall8:729433666861662289>';
        break;
        case 9:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/e/e0/Town_Hall9.png/revision/latest/scale-to-width-down/100?cb=20170827045259';
        playerTownHallIcon = '<:Town_Hall9:729433667151331399>';
        break;
        case 10:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/5/5c/Town_Hall10.png/revision/latest/scale-to-width-down/100?cb=20170827040043';
        playerTownHallIcon = '<:Town_Hall10:729433666975039589>';
        break;
        case 11:
        playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/9/96/Town_Hall11.png/revision/latest/scale-to-width-down/100?cb=20170110011314';
        playerTownHallIcon = '<:Town_Hall11:729433667147006042>';
        break;
        case 12:
            playerTownHallIcon = '<:Town_Hall12:729433667230892103>';
            if (playerTownHallWeaponsLevel == 1) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/9/94/Giga_Tesla1.png/revision/latest/scale-to-width-down/120?cb=20180606163756'
        } else if (playerTownHallWeaponsLevel == 2) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/5/59/Giga_Tesla2.png/revision/latest/scale-to-width-down/120?cb=20180606163808'
        } else if (playerTownHallWeaponsLevel == 3) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/5/59/Giga_Tesla3.png/revision/latest/scale-to-width-down/120?cb=20180606163819'
        } else if (playerTownHallWeaponsLevel == 4) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/6/69/Giga_Tesla4.png/revision/latest/scale-to-width-down/120?cb=20180606163833'
        } else {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/0/06/Giga_Tesla5.png/revision/latest/scale-to-width-down/120?cb=20180606163859'
        }
        break;
        case 13:
            playerTownHallIcon = '<:Town_Hall13:729433667495133294>';
        if (playerTownHallWeaponsLevel == 1) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/0/0e/Giga_Inferno1.png/revision/latest/scale-to-width-down/120?cb=20191212010934'
        } else if (playerTownHallWeaponsLevel == 2) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/5/5d/Giga_Inferno2.png/revision/latest/scale-to-width-down/120?cb=20191212010934'
        } else if (playerTownHallWeaponsLevel == 3) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/1/10/Giga_Inferno3.png/revision/latest/scale-to-width-down/120?cb=20191212010935'
        } else if (playerTownHallWeaponsLevel == 4) {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/3/35/Giga_Inferno4.png/revision/latest/scale-to-width-down/120?cb=20191212010935'
        } else {
            playerTownHallPicture = 'https://vignette.wikia.nocookie.net/clashofclans/images/0/0f/Giga_Inferno5.png/revision/latest/scale-to-width-down/120?cb=20191212010936'
        }
        break;
        }
        if (playerLeagueName) {
        switch (playerLeagueName) {
        case 'Unranked':
        playerLeagueBadge = '<:Unranked_League:729427475808911383>';
        break;
        case 'Bronze League III':
        playerLeagueBadge = '<:Bronze3:729427476647772233>';
        break;
        case 'Bronze League II':
        playerLeagueBadge = '<:Bronze2:729427476408696832>';
        break;
        case 'Bronze League I':
        playerLeagueBadge = '<:Bronze1:729427475527893064>';
        break;
        case 'Silver League III':
        playerLeagueBadge = '<:Silver3:729427476165558442>';
        break;
        case 'Silver League II':
        playerLeagueBadge = '<:Silver2:729427476500971580>';
        break;
        case 'Silver League I':
        playerLeagueBadge = '<:Silver1:729427475901317281>';
        break;
        case 'Gold League III':
        playerLeagueBadge = '<:Gold3:729427476060831754>';
        break;
        case 'Gold League II':
        playerLeagueBadge = '<:Gold2:729427476081803284>';
        break;
        case 'Gold League I':
        playerLeagueBadge = '<:Gold1:729427476261896264>';
        break;
        case 'Crystal League III':
        playerLeagueBadge = '<:Crystal3:729427476060569720>';
        break;
        case 'Crystal League II':
        playerLeagueBadge = '<:Crystal2:729427475880345671> ';
        break;
        case 'Crystal League I':
        playerLeagueBadge = '<:Crystal1:729427475901448343>';
        break;
        case 'Master League III':
        playerLeagueBadge = '<:Master3:729427475792265687>';
        break;
        case 'Master League II':
        playerLeagueBadge = '<:Master2:729427476073283644>';
        break;
        case 'Master League I':
        playerLeagueBadge = '<:Master1:729427475846660157>';
        break;
        case 'Champion League III':
        playerLeagueBadge = '<:Champion3:729427475817300079>';
        break;
        case 'Champion League II':
        playerLeagueBadge = '<:Champion2:729427475972751511>';
        break;
        case 'Champion League I':
        playerLeagueBadge = '<:Champion1:729427475830145056>';
        break;
        case 'Titan League III':
        playerLeagueBadge = '<:Titan3:729427476282867866>';
        break;
        case 'Titan League II':
        playerLeagueBadge = '<:Titan2:729427476144586783>';
        break;
        case 'Titan League I':
        playerLeagueBadge = '<:Titan1:729427476303839412>';
        break;
        case 'Legend League':
        playerLeagueBadge = '<:Legend:729427476081803274>';
        break;
        }
    } else {
        playerLeagueName = 'Unranked'
        playerLeagueBadge = '<:Unranked_League:729427475808911383>'
    }
    if (playerBuilderHallLevel == undefined) {
        playerBuilderHallLevel = 0;
    }
        switch (playerBuilderHallLevel) {
            case 0:
            case 1:
            playerBuilderHallIcon = '<:Builder_Hall1:729455121779654816>';
            break;
            case 2:
            playerBuilderHallIcon = '<:Builder_Hall2:729455121863541010>';
            break;
            case 3:
            playerBuilderHallIcon = '<:Builder_Hall3:729455121989369917>';
            break;
            case 4:
            playerBuilderHallIcon = '<:Builder_Hall4:729455122421121124>';
            break;
            case 5:
            playerBuilderHallIcon = '<:Builder_Hall5:729455122400149535>';
            break;
            case 6:
            playerBuilderHallIcon = '<:Builder_Hall6:729455122530304000>';
            break;
            case 7:
            playerBuilderHallIcon = '<:Builder_Hall7:729455122471583784>';
            break;
            case 8:
            playerBuilderHallIcon = '<:Builder_Hall8:729455122203148289>';
            break;
            case 9:
            playerBuilderHallIcon = '<:Builder_Hall9:729455122374983766>';
            break;
        }
        switch (playerLabelsOne) {
        case 'Clan Wars':
        playerLabelsOneIcon = '<:Clan_Wars:729534644902428737>';
        break;
        case 'Clan War League':
        playerLabelsOneIcon = '<:Clan_War_League:729534645255012472>';
        break;
        case 'Trophy Pushing':
        playerLabelsOneIcon = '<:Trophy_Pushing:729534646190211073>';
        break;
        case 'Friendly Wars':
        playerLabelsOneIcon = '<:Friendly_Wars:729534645246492703>';
        break;
        case 'Clan Games':
        playerLabelsOneIcon = '<:Clan_Games:729534646647521312>';
        break;
        case 'Builder Base':
        playerLabelsOneIcon = '<:Builder_Base:729534645208875089>';
        break;
        case 'Base Designing':
        playerLabelsOneIcon = '<:Base_Designing:729534644810153986>';
        break;
        case 'Farming':
        playerLabelsOneIcon = '<:Farming:729534645158281308>';
        break;
        case 'Active Donator':
        playerLabelsOneIcon = '<:Active_Donator:729534645187772508>';
        break;
        case 'Active Daily':
        playerLabelsOneIcon = '<:Active_Daily:729534645057749052>';
        break;
        case 'Hungry Learner':
        playerLabelsOneIcon = '<:Hungry_Learner:729534645565128704>';
        break;
        case 'Friendly':
        playerLabelsOneIcon = '<:Friendly:729534645506408561>';
        break;
        case 'Talkative':
        playerLabelsOneIcon = '<:Talkative:729534645607071796>';
        break;
        case 'Teacher':
        playerLabelsOneIcon = '<:Teacher:729534645640888430>';
        break;
        case 'Competitive':
        playerLabelsOneIcon = '<:Competitive:729534645418459216>';
        break;
        case 'Veteran':
        playerLabelsOneIcon = '<:Veteran:729534645678374993>';
        break;
        case 'Newbie':
        playerLabelsOneIcon = '<:Newbie:729534645246492744>';
        break;
        case 'Amateur Attacker':
        playerLabelsOneIcon = '<:Amateur_Attacker:729534645145960588>';
        break;
        case 'No Label':
        playerLabelsOneIcon = '<:No_Label:729784659290095687>';
        break;
        }   
        switch (playerLabelsTwo) {
            case 'Clan Wars':
            playerLabelsTwoIcon = '<:Clan_Wars:729534644902428737>';
            break;
            case 'Clan War League':
            playerLabelsTwoIcon = '<:Clan_War_League:729534645255012472>';
            break;
            case 'Trophy Pushing':
            playerLabelsTwoIcon = '<:Trophy_Pushing:729534646190211073>';
            break;
            case 'Friendly Wars':
            playerLabelsTwoIcon = '<:Friendly_Wars:729534645246492703>';
            break;
            case 'Clan Games':
            playerLabelsTwoIcon = '<:Clan_Games:729534646647521312>';
            break;
            case 'Builder Base':
            playerLabelsTwoIcon = '<:Builder_Base:729534645208875089>';
            break;
            case 'Base Designing':
            playerLabelsTwoIcon = '<:Base_Designing:729534644810153986>';
            break;
            case 'Farming':
            playerLabelsTwoIcon = '<:Farming:729534645158281308>';
            break;
            case 'Active Donator':
            playerLabelsTwoIcon = '<:Active_Donator:729534645187772508>';
            break;
            case 'Active Daily':
            playerLabelsTwoIcon = '<:Active_Daily:729534645057749052>';
            break;
            case 'Hungry Learner':
            playerLabelsTwoIcon = '<:Hungry_Learner:729534645565128704>';
            break;
            case 'Friendly':
            playerLabelsTwoIcon = '<:Friendly:729534645506408561>';
            break;
            case 'Talkative':
            playerLabelsTwoIcon = '<:Talkative:729534645607071796>';
            break;
            case 'Teacher':
            playerLabelsTwoIcon = '<:Teacher:729534645640888430>';
            break;
            case 'Competitive':
            playerLabelsTwoIcon = '<:Competitive:729534645418459216>';
            break;
            case 'Veteran':
            playerLabelsTwoIcon = '<:Veteran:729534645678374993>';
            break;
            case 'Newbie':
            playerLabelsTwoIcon = '<:Newbie:729534645246492744>';
            break;
            case 'Amateur Attacker':
            playerLabelsTwoIcon = '<:Amateur_Attacker:729534645145960588>';
            break;
            case 'No Label':
            playerLabelsTwoIcon = '<:No_Label:729784659290095687>';
            break;
            }
            switch (playerLabelsThree) {
                case 'Clan Wars':
                playerLabelsThreeIcon = '<:Clan_Wars:729534644902428737>';
                break;
                case 'Clan War League':
                playerLabelsThreeIcon = '<:Clan_War_League:729534645255012472>';
                break;
                case 'Trophy Pushing':
                playerLabelsThreeIcon = '<:Trophy_Pushing:729534646190211073>';
                break;
                case 'Friendly Wars':
                playerLabelsThreeIcon = '<:Friendly_Wars:729534645246492703>';
                break;
                case 'Clan Games':
                playerLabelsThreeIcon = '<:Clan_Games:729534646647521312>';
                break;
                case 'Builder Base':
                playerLabelsThreeIcon = '<:Builder_Base:729534645208875089>';
                break;
                case 'Base Designing':
                playerLabelsThreeIcon = '<:Base_Designing:729534644810153986>';
                break;
                case 'Farming':
                playerLabelsThreeIcon = '<:Farming:729534645158281308>';
                break;
                case 'Active Donator':
                playerLabelsThreeIcon = '<:Active_Donator:729534645187772508>';
                break;
                case 'Active Daily':
                playerLabelsThreeIcon = '<:Active_Daily:729534645057749052>';
                break;
                case 'Hungry Learner':
                playerLabelsThreeIcon = '<:Hungry_Learner:729534645565128704>';
                break;
                case 'Friendly':
                playerLabelsThreeIcon = '<:Friendly:729534645506408561>';
                break;
                case 'Talkative':
                playerLabelsThreeIcon = '<:Talkative:729534645607071796>';
                break;
                case 'Teacher':
                playerLabelsThreeIcon = '<:Teacher:729534645640888430>';
                break;
                case 'Competitive':
                playerLabelsThreeIcon = '<:Competitive:729534645418459216>';
                break;
                case 'Veteran':
                playerLabelsThreeIcon = '<:Veteran:729534645678374993>';
                break;
                case 'Newbie':
                playerLabelsThreeIcon = '<:Newbie:729534645246492744>';
                break;
                case 'Amateur Attacker':
                playerLabelsThreeIcon = '<:Amateur_Attacker:729534645145960588>';
                break;
                case 'No Label':
                playerLabelsThreeIcon = '<:No_Label:729784659290095687>';
                break;
                }  
            if (playerTroopsDonated > 0 && playerTroopsReceived == 0) {  
                playerTroopsRatioApproval = ':infinity:'
                playerTroopsRatio = 'Infinity'
            } else {
            if (playerTroopsRatio > 1 && playerTroopsRatio < 99999999) {
                playerTroopsRatioApproval = ':white_check_mark:'
            } else if (playerTroopsRatio < 1 && playerTroopsDonated != playerTroopsReceived) {
                playerTroopsRatioApproval = ':x:'
            } else if (playerTroopsRatio == 1 || playerTroopsDonated == playerTroopsReceived) {
                playerTroopsRatioApproval = ':scales:'
            }
        }
            
  } catch (error) {
    //console.error(error)
  }
}

var clanTag;
var clanName;
var clanInviteType;
var clanInviteTypeDisplay;
var clanDescription;
var clanLocationName;
var clanBadgePicture;
var clanLevel;
var clanTrophies;
var clanVersusTrophies;
var clanReqTrophies;
var clanWarFreq;
var clanWarWins;
var clanWarTies;
var clanWarLosses;
var clanPublicWarLog;
var clanPublicWarLogDisplay;
var clanMembersCount;
var clanLabelsOne;
var clanLabelsTwo;
var clanLabelsThree;
var clanLabelsOneIcon;
var clanLabelsTwoIcon;
var clanLabelsThreeIcon;
var clanCWLLeague;
var clanCWLLeagueIcon;
var clanWarWinStreak;
var clanWarWinsDisplay;
var clanWarLossesDisplay;
var clanWarWinLossRatio;
var clanWarWinLossIcon;



async function showClanByTag(tag) {
  try {
      const ClanByTag = await client.clanByTag(tag)
      var parseClanData = JSON.parse(JSON.stringify(ClanByTag))
      //console.log(parseClanData)
      console.log()
      clanTag = parseClanData['tag']
      clanName = parseClanData['name']
      clanInviteType = parseClanData['type']
      clanDescription = parseClanData['description']
      clanLocationName = parseClanData['location']['name']
      clanBadgePicture = parseClanData['badgeUrls']['medium']
      clanLevel = parseClanData['clanLevel']
      clanTrophies = parseClanData['clanPoints'].toLocaleString("en")
      clanVersusTrophies = parseClanData['clanVersusPoints'].toLocaleString("en")
      clanReqTrophies = parseClanData['requiredTrophies'].toLocaleString("en")
      clanWarFreq = parseClanData['warFrequency']
      clanWarWinStreak = parseClanData['warWinStreak']
      clanWarWins = parseClanData['warWins']
      clanWarWinsDisplay = parseClanData['warWins'].toLocaleString("en")
      clanPublicWarLog = parseClanData['isWarLogPublic']
      clanMembersCount = parseClanData['members']
      clanLabelsOne = parseClanData['labels'][0]['name']
      clanLabelsTwo = parseClanData['labels'][1]['name']
      clanLabelsThree = parseClanData['labels'][2]['name']
      clanCWLLeague = parseClanData['warLeague']['name']
      if (clanPublicWarLog == true) 
      {
        clanPublicWarLogDisplay = 'Public'
        clanWarLossesDisplay = parseClanData['warLosses']
        clanWarLosses = parseClanData['warLosses'].toLocaleString("en")
        clanWarTies = parseClanData['warTies']
        clanWarWinLossRatio = (clanWarWins / clanWarLosses).toFixed(3)
        if (clanWarWinLossRatio > 1 && clanWarWinLossRatio < 9999999) {
            clanWarWinLossIcon = ':white_check_mark:'
        }
        if (clanWarWinLossRatio < 1 && clanWarWinLossRatio > 0.0001) {
            clanWarWinLossIcon = ':x:'
        }
        if (clanWarWinLossRatio == 1) {
            clanWarWinLossIcon = ':scales:'
        }
        if (clanWarWins > 0 && clanWarLosses == 0) {
            clanWarWinLossRatio = 'Infinity'
            clanWarWinLossIcon = ':infinity:'
        }
      }
        else {
        clanPublicWarLogDisplay = 'Private'
    }

      //for (i = 0; i < clanMembersCount; i++) {
      //    console.log(parseClanData['memberList'][i]['name'])
      //}
      switch (clanCWLLeague) {
        case 'Bronze League III':
        clanCWLLeagueIcon = '<:WarBronzeIII:730077632083001357>';
        break;
        case 'Bronze League II':
        clanCWLLeagueIcon = '<:WarBronzeII:730077630434377879>';
        break;
        case 'Bronze League I':
        clanCWLLeagueIcon = '<:WarBronzeI:730077630082056272>';
        break;
        case 'Silver League III':
        clanCWLLeagueIcon = '<:WarSilverIII:730077633886552105>';
        break;
        case 'Silver League II':
        clanCWLLeagueIcon = '<:WarSilverII:730077633668186224>';
        break;
        case 'Silver League I':
        clanCWLLeagueIcon = '<:WarSilverI:730077633605402695>';
        break;
        case 'Gold League III':
        clanCWLLeagueIcon = '<:WarGoldIII:730077633743945758>';
        break;
        case 'Gold League II':
        clanCWLLeagueIcon = '<:WarGoldII:730077633639088199>';
        break;
        case 'Gold League I':
        clanCWLLeagueIcon = '<:WarGoldI:730077633249017897>';
        break;
        case 'Crystal League III':
        clanCWLLeagueIcon = '<:WarCrystalIII:730077633697808404>';
        break;
        case 'Crystal League II':
        clanCWLLeagueIcon = '<:WarCrystalII:730077633706197043>';
        break;
        case 'Crystal League I':
        clanCWLLeagueIcon = '<:WarCrystalI:730077633378779237>';
        break;
        case 'Master League III':
        clanCWLLeagueIcon = '<:WarMasterIII:730077633865318430>';
        break;
        case 'Master League II':
        clanCWLLeagueIcon = '<:WarMasterII:730077633622048809>';
        break;
        case 'Master League I':
        clanCWLLeagueIcon = '<:WarMasterI:730077633693614191>';
        break;
        case 'Champion League III':
        clanCWLLeagueIcon = '<:WarChampionIII:730077632883851276>';
        break;
        case 'Champion League II':
        clanCWLLeagueIcon = '<:WarChampionII:730077633160806440>';
        break;
        case 'Champion League I':
        clanCWLLeagueIcon = '<:WarChampionI:730077633215201300>';
        break;
      }
      switch (clanLabelsOne) {
        case 'Clan Wars':
        clanLabelsOneIcon = '<:Clan_Wars:729534644902428737>';
        break;
        case 'Clan War League':
            clanLabelsOneIcon = '<:Clan_War_League:729534645255012472>';
        break;
        case 'Trophy Pushing':
            clanLabelsOneIcon = '<:Trophy_Pushing:729534646190211073>';
        break;
        case 'Friendly Wars':
            clanLabelsOneIcon = '<:Friendly_Wars:729534645246492703>';
        break;
        case 'Clan Games':
            clanLabelsOneIcon = '<:Clan_Games:729534646647521312>';
        break;
        case 'Builder Base':
            clanLabelsOneIcon = '<:Builder_Base:729534645208875089>';
        break;
        case 'Base Designing':
            clanLabelsOneIcon = '<:Base_Designing:729534644810153986>';
        break;
        case 'Farming':
            clanLabelsOneIcon = '<:Farming:729534645158281308>';
        break;
        case 'Active Donator':
            clanLabelsOneIcon = '<:Active_Donator:729534645187772508>';
        break;
        case 'Active Daily':
            clanLabelsOneIcon = '<:Active_Daily:729534645057749052>';
        break;
        case 'Hungry Learner':
            clanLabelsOneIcon = '<:Hungry_Learner:729534645565128704>';
        break;
        case 'Friendly':
            clanLabelsOneIcon = '<:Friendly:729534645506408561>';
        break;
        case 'Talkative':
            clanLabelsOneIcon = '<:Talkative:729534645607071796>';
        break;
        case 'Teacher':
            clanLabelsOneIcon = '<:Teacher:729534645640888430>';
        break;
        case 'Competitive':
            clanLabelsOneIcon = '<:Competitive:729534645418459216>';
        break;
        case 'Veteran':
            clanLabelsOneIcon = '<:Veteran:729534645678374993>';
        break;
        case 'Newbie':
            clanLabelsOneIcon = '<:Newbie:729534645246492744>';
        break;
        case 'Amateur Attacker':
            clanLabelsOneIcon = '<:Amateur_Attacker:729534645145960588>';
        break;
        case 'No Label':
            clanLabelsOneIcon = '<:No_Label:729784659290095687>';
        break;
        }   
        switch (clanLabelsTwo) {
            case 'Clan Wars':
                clanLabelsTwoIcon = '<:Clan_Wars:729534644902428737>';
            break;
            case 'Clan War League':
                clanLabelsTwoIcon = '<:Clan_War_League:729534645255012472>';
            break;
            case 'Trophy Pushing':
                clanLabelsTwoIcon = '<:Trophy_Pushing:729534646190211073>';
            break;
            case 'Friendly Wars':
                clanLabelsTwoIcon = '<:Friendly_Wars:729534645246492703>';
            break;
            case 'Clan Games':
                clanLabelsTwoIcon = '<:Clan_Games:729534646647521312>';
            break;
            case 'Builder Base':
                clanLabelsTwoIcon = '<:Builder_Base:729534645208875089>';
            break;
            case 'Base Designing':
                clanLabelsTwoIcon = '<:Base_Designing:729534644810153986>';
            break;
            case 'Farming':
                clanLabelsTwoIcon = '<:Farming:729534645158281308>';
            break;
            case 'Active Donator':
                clanLabelsTwoIcon = '<:Active_Donator:729534645187772508>';
            break;
            case 'Active Daily':
                clanLabelsTwoIcon = '<:Active_Daily:729534645057749052>';
            break;
            case 'Hungry Learner':
                clanLabelsTwoIcon = '<:Hungry_Learner:729534645565128704>';
            break;
            case 'Friendly':
                clanLabelsTwoIcon = '<:Friendly:729534645506408561>';
            break;
            case 'Talkative':
                clanLabelsTwoIcon = '<:Talkative:729534645607071796>';
            break;
            case 'Teacher':
                clanLabelsTwoIcon = '<:Teacher:729534645640888430>';
            break;
            case 'Competitive':
                clanLabelsTwoIcon = '<:Competitive:729534645418459216>';
            break;
            case 'Veteran':
                clanLabelsTwoIcon = '<:Veteran:729534645678374993>';
            break;
            case 'Newbie':
                clanLabelsTwoIcon = '<:Newbie:729534645246492744>';
            break;
            case 'Amateur Attacker':
                clanLabelsTwoIcon = '<:Amateur_Attacker:729534645145960588>';
            break;
            case 'No Label':
                clanLabelsTwoIcon = '<:No_Label:729784659290095687>';
            break;
            }
            switch (clanLabelsThree) {
                case 'Clan Wars':
                clanLabelsThreeIcon = '<:Clan_Wars:729534644902428737>';
                break;
                case 'Clan War League':
                    clanLabelsThreeIcon = '<:Clan_War_League:729534645255012472>';
                break;
                case 'Trophy Pushing':
                    clanLabelsThreeIcon = '<:Trophy_Pushing:729534646190211073>';
                break;
                case 'Friendly Wars':
                    clanLabelsThreeIcon = '<:Friendly_Wars:729534645246492703>';
                break;
                case 'Clan Games':
                    clanLabelsThreeIcon = '<:Clan_Games:729534646647521312>';
                break;
                case 'Builder Base':
                    clanLabelsThreeIcon = '<:Builder_Base:729534645208875089>';
                break;
                case 'Base Designing':
                    clanLabelsThreeIcon = '<:Base_Designing:729534644810153986>';
                break;
                case 'Farming':
                    clanLabelsThreeIcon = '<:Farming:729534645158281308>';
                break;
                case 'Active Donator':
                    clanLabelsThreeIcon = '<:Active_Donator:729534645187772508>';
                break;
                case 'Active Daily':
                    clanLabelsThreeIcon = '<:Active_Daily:729534645057749052>';
                break;
                case 'Hungry Learner':
                    clanLabelsThreeIcon = '<:Hungry_Learner:729534645565128704>';
                break;
                case 'Friendly':
                    clanLabelsThreeIcon = '<:Friendly:729534645506408561>';
                break;
                case 'Talkative':
                    clanLabelsThreeIcon = '<:Talkative:729534645607071796>';
                break;
                case 'Teacher':
                    clanLabelsThreeIcon = '<:Teacher:729534645640888430>';
                break;
                case 'Competitive':
                    clanLabelsThreeIcon = '<:Competitive:729534645418459216>';
                break;
                case 'Veteran':
                    clanLabelsThreeIcon = '<:Veteran:729534645678374993>';
                break;
                case 'Newbie':
                    clanLabelsThreeIcon = '<:Newbie:729534645246492744>';
                break;
                case 'Amateur Attacker':
                    clanLabelsThreeIcon = '<:Amateur_Attacker:729534645145960588>';
                break;
                case 'No Label':
                    clanLabelsThreeIcon = '<:No_Label:729784659290095687>';
                break;
                }

  
  } catch (error) {
      //console.error(error)
  }
}

//Niko: #8JGG220YG
//Build: #9QCVUR0QQ
//Mick B: #L822LP9R
//Roady: #YQGR8PV02

const token = '';

const PREFIX = '!';

bot.on('ready', () =>{
    console.log('This bot is online!');
    reminderNameCheckLoop();
	setTerminalTitle('Clash of Clans Bot')
})

bot.on('message', async message=>{

    if(!message.content.startsWith(PREFIX)) return;
    let args = message.content.substring(PREFIX.length).split(" ");
    let argse = message.content.substring(PREFIX.length);

    switch(args[0].toLowerCase()){
        case 'ping':
        message.channel.send('Pong! :ping_pong:')
        break;
        case 'help':
        const helpPage = new Discord.MessageEmbed()
            .setColor('#eb0e0e')
            .setTitle('Help Page')
            .setAuthor('Clash of Clans Bot', 'https://freepngimg.com/download/clash_of_clans/93475-heart-clash-of-boom-royale-clans-beach.png', "https://www.github.com/Popboy11")
            .setThumbnail('https://i.imgur.com/m2nBrcm.png')
            .addField('Commands', '**!help** - Brings up the help page!\n**!ping** - Pings the bot!\n**!bugreport [report]** - Files a Bug report to the bot\'s creator\n**!player [tag]** - Shows Statistics for the player\n**!player clan [tag]** - Shows the page for the player\'s clan\n**!clan [tag]** - Shows the page for the Clan\n**!remind** - Creates a new reminder')
        message.channel.send(helpPage)
        break;
        case 'bugreport':
        if (args[1]) {
        message.channel.send('A bug report has been sent! **Your report:** *"' + (argse).substring(10) + '"*')
        console.log(message.author['tag'], 'filed a bug report! Report: ' + (argse).substring(10))
        } else {
        message.channel.send('Please specify what you\'re reporting. **Example:** *!bugreport Information is Incorrect.*')
        console.log(message.author['tag'], 'tried to file an empty bug report!')
        }
        break;
        case 'player':
            playerIdTried = args[1]
            playerRestOfMessage = argse.substring(7)
            if (playerRestOfMessage.charAt[0] == ' ') { playerRestOfMessage.slice(1) }
            console.log(playerRestOfMessage)
            GetPlayerStats(playerIdTried, message.channel, message.author['tag'], playerRestOfMessage);
            break;
        //Private clan: #29CY0090
        //The blue angel: #2VPJQP0J
        case 'clan':
            channelSentIn = message.channel;
            playerClanAttempt = args[1];
            clanRestOfMessage = argse.substring(5)
            if (clanRestOfMessage.charAt[0] == ' ') { clanRestOfMessage.slice(1) }
            GetPlayerStatsClan(message.channel, playerClanAttempt, clanRestOfMessage, message.author['tag']);
        break;
        case 'pingms':
            message.channel.send(`Pong! :ping_pong:`).then(m => {
                m.edit('Pong! :ping_pong: ' + (m.createdTimestamp - message.createdTimestamp) + 'ms');
            });
        break;
        case 'remind':
        try {    
            if (args[1] && args[2] && !Number.isNaN(args[1])) { 
            var date = new Date();
            timeStarted = date.getTime();
            timeNumber = parseFloat(args[1].slice(0, -1));
            if (args[1].slice(-1) == 's') {
            timetoRemind = (timeStarted + (1000 * timeNumber))
            if (timeNumber == 1) { timerUnitCache = 'second' } else { timerUnitCache = 'seconds' }
            timerCorrectFormat = 1;
            } else if (args[1].slice(-1) == 'm') {
            timetoRemind = (timeStarted + (60000 * timeNumber))
            if (timeNumber == 1) { timerUnitCache = 'minute' } else { timerUnitCache = 'minutes' }
            timerCorrectFormat = 1;
            } else if (args[1].slice(-1) == 'h') {
            timetoRemind = (timeStarted + (3600000 * timeNumber))
            if (timeNumber == 1) { timerUnitCache = 'hour' } else { timerUnitCache = 'hours' }
            timerCorrectFormat = 1;
            } else if (args[1].slice(-1) == 'd') {
            timetoRemind = (timeStarted + (86400000 * timeNumber))
            if (timeNumber == 1) { timerUnitCache = 'day' } else { timerUnitCache = 'days' }
            timerCorrectFormat = 1;
            } else if (args[1].slice(-1) == 'w') {
            timetoRemind = (timeStarted + (604800000 * timeNumber))
            if (timeNumber == 1) { timerUnitCache = 'week' } else { timerUnitCache = 'weeks' }
            timerCorrectFormat = 1;
            } if (timerCorrectFormat == 1 && !Number.isNaN(timeNumber)) {
            var timeLength = (args[0].length + args[1].length + 2)
            newTimetoRemind = parseInt(timetoRemind)
            channelTimer = message.channel;
            personTimer = message.author;
            timerMessage = argse.substring(timeLength)
            message.channel.send('Created a reminder: "' + timerMessage + '", you\'ll be remined in ' + timeNumber + ' ' + timerUnitCache)
            fs.writeFileSync(`./Reminders/${newTimetoRemind}.txt`, `${personTimer}\n${newTimetoRemind}\n${timerMessage}\n${channelTimer}`)
            timerGoing = 1;
            timerCorrectFormat = 0;
            } else { message.channel.send('Please format the time correctly! Example: !remind 5m Take out the trash') }
            } else if (args[1] && !args[2]){
            message.channel.send('You need to enter a reminder! Example: !remind 5m Take out the trash')
            } else {
            message.channel.send('You need to enter a duration and reminder! Example: !remind 5m Take out the trash')
            }
        } catch (error) {
            console.log(error)
        }
            break;
        case 'sync':
            if (args[1]) {
                playerFunctionAttempt = args[1];
                if (playerFunctionAttempt.charAt(0) != '#') {playerFunctionAttempt = '#' + playerFunctionAttempt}
                await showPlayerInfo(playerFunctionAttempt);
                if (playerFunctionAttempt == playerTag) {
                    playerSyncDiscord = message.author['id']
                    fs.writeFileSync(`./PlayerTags/${playerSyncDiscord}.txt`, `${playerTag}\n${playerClanTag}`)
                    message.channel.send('Player ' + playerName + ' (' + playerFunctionAttempt + ') synced to your Discord account successfully!')
                    console.log(message.author['tag'] + ': Synced their Player profile successfully! Their profile: ' + playerName + ' (' + playerFunctionAttempt + ')')
                } else { message.channel.send('Please use a valid player tag! Example: #PCCQ0V2C0') }
            } else { message.channel.send('Please include a tag! Example: #PCCQ0V2C0') }
        break;
        case 'unsync':
            try {
            playerSyncDiscord = message.author['id']
            fs.unlinkSync(`./PlayerTags/${playerSyncDiscord}.txt`)
            message.channel.send('Player unsynced successfully!')
            } catch (error) {
            message.channel.send('No player found to unsync!')
            }
        break;
        case 'stats':
            fs.readdir('./PlayerTags/', (err, files) => {
                var amountOfPlayerTags = files.length
                var amountOfTimesExecuted = 0;
                files.forEach(file => {
                    tryUserIdPlayer = (file).slice(0, -4)
                    personThatSentMessage = message.author['id']
                    if (personThatSentMessage == tryUserIdPlayer) {
                        var getUserIdPlayer = fs.readFileSync('./PlayerTags/' + tryUserIdPlayer + '.txt', 'utf8')
                            var userIdPlayer = getUserIdPlayer.split("\n")
                            playerIdTried = userIdPlayer[0]
                            playerClanTried = userIdPlayer[1]
                            playerRestOfMessage = argse.substring(7)
                            if (playerRestOfMessage.charAt[0] == ' ') { playerRestOfMessage.slice(1) }
                            amountOfTimesExecuted = 0;
                            if (!args[1]) {
                            GetPlayerStats(playerIdTried, message.channel, message.author['tag'], playerRestOfMessage);
                            console.log(message.author['tag'] + ': Synced player executed successfully!')
                            } else if (args[1] == 'clan') {
                            GetPlayerStatsClan(message.channel, playerClanTried, clanRestOfMessage, message.author['tag']);
                            console.log(message.author['tag'] + ': Synced player clan executed successfully!')
                            }
                        } else {
                            console.log(personThatSentMessage)
                            amountOfTimesExecuted++;
                            if (amountOfTimesExecuted > (amountOfPlayerTags - 1)) {
                                console.log('Synced profile not found! Sync yours with !sync [playertag]')
                            }
                        }
                });
                if (amountOfPlayerTags == 0) { message.channel.send('Synced profile not found! In fact, no profiles exist. Sync yours with !sync [playertag]') }
              });             
        break;
        //case 'warlog':
        //break;
        }
})

async function GetPlayerStats(playerTried, playerChannelSent, playerTriedExecute, playerRestOfMessage) {
    if (playerTried) {
        playerFunctionAttempt = playerTried;
        if (playerFunctionAttempt.charAt(0) != '#') {playerFunctionAttempt = '#' + playerFunctionAttempt}
        await showPlayerInfo(playerFunctionAttempt);
        if (playerFunctionAttempt == playerTag) {
        const playerProfile = new Discord.MessageEmbed()
            .setColor('#eb0e0e')
            .setTitle('Player Statistics: ' + playerName)
            .setAuthor('Clash of Clans Bot', 'https://freepngimg.com/download/clash_of_clans/93475-heart-clash-of-boom-royale-clans-beach.png', "https://www.github.com/Popboy11")
            .setThumbnail(playerTownHallPicture)
            if (playerTownHallLevel < 12) {
                playerProfile.addField('<:BarbarianHead:729444860779823164> General Stats', '**Name:** ' + playerName + '\n**Tag:** ' + playerTag.toUpperCase() + '\n' + '**Town Hall:** Level ' + playerTownHallLevel + ' ' + playerTownHallIcon + '\n**Builder Hall:** Level ' + playerBuilderHallLevel + ' ' + playerBuilderHallIcon + '\n**XP Level: **' + playerXPLevel + '<:XP:729417604443275395>\n**War Stars:** ' + playerWarStars + '<:ClashStar:729424177823744080>\n**League:** ' + playerLeagueName + ' ' + playerLeagueBadge + '\n**Gold Grab:** ' + playerGoldGrab + '<:Gold:729414904993546271>\n**Elixir Escapade:** ' + playerElixirEscapade + '<:Elixir:729414905312313349>\n**Heroic Heist:** ' + playerHeroicHeist + '<:DarkElixir:729414905136021544>' + '\n**Attack Wins:** ' + playerAttackWins + '<:Attack:729448819619659808>\n**Defense Wins:** ' + playerDefenseWins + ' <:Shield:729448537900712057>\n**Attack Wins All Time:** ' + playerMultiplayerBattlesWon + '<:Attack:729448819619659808>\n**Defense Wins All Time:** ' + playerMultiplayerDefensesWon + ' <:Shield:729448537900712057>' + '\n**Versus Battle Wins:** ' + playerBuilderBaseBattleWins + ' <:Axes:729457705026322452>')
            } else if (playerTownHallLevel == 12) {
                playerProfile.addField('<:BarbarianHead:729444860779823164> General Stats', '**Name:** ' + playerName + '\n**Tag:** ' + playerTag.toUpperCase() + '\n' + '**Town Hall:** Level ' + playerTownHallLevel + ' ' + playerTownHallIcon + '\n**Giga Tesla:** Level ' + playerTownHallWeaponsLevel + ' <:Giga_Tesla:729793227321901107>\n**Builder Hall:** Level ' + playerBuilderHallLevel + ' ' + playerBuilderHallIcon + '\n**XP Level: **' + playerXPLevel + '<:XP:729417604443275395>\n**War Stars:** ' + playerWarStars + '<:ClashStar:729424177823744080>\n**League:** ' + playerLeagueName + ' ' + playerLeagueBadge + '\n**Gold Grab:** ' + playerGoldGrab + '<:Gold:729414904993546271>\n**Elixir Escapade:** ' + playerElixirEscapade + '<:Elixir:729414905312313349>\n**Heroic Heist:** ' + playerHeroicHeist + '<:DarkElixir:729414905136021544>' + '\n**Attack Wins:** ' + playerAttackWins + '<:Attack:729448819619659808>\n**Defense Wins:** ' + playerDefenseWins + ' <:Shield:729448537900712057>\n**Attack Wins All Time:** ' + playerMultiplayerBattlesWon + '<:Attack:729448819619659808>\n**Defense Wins All Time:** ' + playerMultiplayerDefensesWon + ' <:Shield:729448537900712057>' + '\n**Versus Battle Wins:** ' + playerBuilderBaseBattleWins + ' <:Axes:729457705026322452>')
            } else if (playerTownHallLevel == 13) {
                playerProfile.addField('<:BarbarianHead:729444860779823164> General Stats', '**Name:** ' + playerName + '\n**Tag:** ' + playerTag.toUpperCase() + '\n' + '**Town Hall:** Level ' + playerTownHallLevel + ' ' + playerTownHallIcon + '\n**Giga Inferno:** Level ' + playerTownHallWeaponsLevel + ' <:Giga_Inferno:729793227267375507>\n**Builder Hall:** Level ' + playerBuilderHallLevel + ' ' + playerBuilderHallIcon + '\n**XP Level: **' + playerXPLevel + '<:XP:729417604443275395>\n**War Stars:** ' + playerWarStars + '<:ClashStar:729424177823744080>\n**League:** ' + playerLeagueName + ' ' + playerLeagueBadge + '\n**Gold Grab:** ' + playerGoldGrab + '<:Gold:729414904993546271>\n**Elixir Escapade:** ' + playerElixirEscapade + '<:Elixir:729414905312313349>\n**Heroic Heist:** ' + playerHeroicHeist + '<:DarkElixir:729414905136021544>' + '\n**Attack Wins:** ' + playerAttackWins + '<:Attack:729448819619659808>\n**Defense Wins:** ' + playerDefenseWins + ' <:Shield:729448537900712057>\n**Attack Wins All Time:** ' + playerMultiplayerBattlesWon + '<:Attack:729448819619659808>\n**Defense Wins All Time:** ' + playerMultiplayerDefensesWon + ' <:Shield:729448537900712057>' + '\n**Versus Battle Wins:** ' + playerBuilderBaseBattleWins + ' <:Axes:729457705026322452>')
            }
            playerProfile.addField('<:ClashTrophy:729403373463273495> Trophies', '**Current:** ' + playerTrophies + '<:ClashTrophy:729403373463273495>\n**All Time:** ' + playerTopTrophies + '<:ClashTrophy:729403373463273495>', true)
            playerProfile.addField('<:ClashVersusTrophy:729406008610258994> Versus Trophies', '**Current:** ' + playerBuilderBaseTrophies + '<:ClashVersusTrophy:729406008610258994>\n**All Time:** ' + playerTopBuilderBaseTrophies + '<:ClashVersusTrophy:729406008610258994>', true)
            if (playerLegendStatsUnlocked == 1) {
            if (playerLegendTrophies != null) {
                playerProfile.addField('<:Legend:729427476081803274> Legend League Trophies', 'Legend Trophies: ' + playerLegendTrophies, true)
            }
            if (playerLegendCurrentSeasonTrophies != null) {
                playerProfile.addField('<:Legend:729427476081803274> Legend League Current Season', 'Trophies: ' + playerLegendCurrentSeasonTrophies + '<:LLT_Info:729747827185680464>', true)
            }
            if (playerLegendPreviousSeasonTrophies != null) {
                playerProfile.addField('<:Legend:729427476081803274> Legend League Previous Season', 'Rank: ' + playerLegendPreviousSeasonRank + ':medal:\nTrophies: ' + playerLegendPreviousSeasonTrophies + '<:LLT_Info:729747827185680464>\nDate: ' + playerLegendPreviousSeasonDate + '<:Calendar:729770145844690996>', true)
            }
            if (playerLegendBestSeasonTrophies != null) {
                playerProfile.addField('<:Legend:729427476081803274> Legend League Best Season', 'Rank: ' + playerLegendBestSeasonRank + ':medal:\nTrophies: ' + playerLegendBestSeasonTrophies + '<:LLT_Info:729747827185680464>\nDate: ' + playerLegendBestSeasonDate + '<:Calendar:729770145844690996>', true)
            }
            if (playerVersusBestSeasonTrophies != null && playerVersusPreviousSeasonTrophies != null) {
                playerProfile.addField('<:Icon_Versus_Trophy_Tourney:729755179045355640> Versus Battle Tournament Stats', '**Best Versus Season:**\nRank: ' + playerVersusBestSeasonRank + ':medal:\nTrophies: ' + playerVersusBestSeasonTrophies + '<:Icon_Versus_Trophy_Tourney:729755179045355640>\nDate: ' + playerVersusBestSeasonDate + '<:Calendar:729770145844690996>\n**Previous Versus Season:**\nRank: ' + playerVersusPreviousSeasonRank + '\nTrophies: ' + playerVersusPreviousSeasonTrophies + '<:Icon_Versus_Trophy_Tourney:729755179045355640>\nDate: ' + playerVersusPreviousSeasonDate)
            } else if (playerVersusBestSeasonTrophies != null && playerVersusPreviousSeasonTrophies == null) {
                playerProfile.addField('<:Icon_Versus_Trophy_Tourney:729755179045355640> Versus Battle Tournament Stats', '**Best Versus Season:**\nRank: ' + playerVersusBestSeasonRank + ':medal:\nTrophies: ' + playerVersusBestSeasonTrophies + '<:Icon_Versus_Trophy_Tourney:729755179045355640>\nDate: ' + playerVersusBestSeasonDate + '<:Calendar:729770145844690996>')
            } playerLegendStatsUnlocked = 0;
        }
                playerProfile.addField('<:Clan_Castle3:729439332800397344> Donations', '**Troops Donated:** ' + playerTroopsDonatedDisplay + '<:Barbarian1:729441953086832725>\n**Troops Received:** ' + playerTroopsReceivedDisplay + '<:Barbarian1:729441953086832725>\n**Donation Ratio:** ' + playerTroopsRatio + ' ' + playerTroopsRatioApproval + '\n**All Time Troops Donated:** ' + playerTotalTroopsDonated + '<:Barbarian1:729441953086832725>\n**All Time Spells Donated**: ' + playerSpellsDonated + '<:Spell:729446175392137286>')
            if (playerClanTag != 'Not in a Clan!') {
                playerProfile.addField('<:Shield:729448537900712057> Clan', '**Clan Name:** ' + playerClanName + '\n**Clan Tag:** ' + playerClanTag + '\n**Clan Level:** ' + playerClanLevel + '\n' + '**' + playerName + '\'s Role:** ' + playerClanRole, true)
            }
            //if (playerLabelsOne != 'No Label' && playerLabelsTwo != 'No Label' && playerLabelsThree != 'No Label') {
            playerProfile.addField('<:Loot_Cart1:729771834823934002> Labels', playerLabelsOneIcon + ' ' + '**' + playerLabelsOne + '**\n**' + playerLabelsTwoIcon + ' ' + playerLabelsTwo + '**\n**' + playerLabelsThreeIcon + ' ' + playerLabelsThree + '**')
            //}
            playerProfile.addField('<:Gem:729460227065380895> Misc. Stats', '**Clan Games Points:** ' + playerClanGamePoints + '<:Clan_Games_Guy:729459724445155479>' + '\n**Season Challenge Points**: ' + playerSeasonPoints + ' <:Gold_Pass:729519200783040653>\n**CWL Stars**: ' + playerCWLStars + '<:ClashStar:729424177823744080>\n**Campaign Stars**: ' + playerCampaignStars + '<:ClashStar:729424177823744080>\n**Obstacles Removed**: ' + playerObstaclesRemoved + '<:Clear_Obstacles:729522095452586068>')
            console.log(playerTriedExecute + ':', 'Player "' + playerName + '"(' + playerFunctionAttempt.toUpperCase() + ') executed successfully!')
        playerChannelSent.send(playerProfile);
        } else {
            playerChannelSent.send('Please use a valid tag! Example: #PCCQ0V2C0, you used: ' + playerRestOfMessage)
            console.log(playerTriedExecute + ' didn\'t use a valid tag, they used: ' + playerRestOfMessage)
        }
    } else {
        playerChannelSent.send('Please include a player tag! Example: #PCCQ0V2C0')
        console.log(playerTriedExecute + ' didn\'t include a tag while using !player')
    }
}

async function GetPlayerStatsClan(channelSentIn, playerClanAttempt, clanRestOfMessage, clanCommandAuthor) {
    if (playerClanAttempt) {
    await showClanByTag(playerClanAttempt)
    if (playerClanAttempt.charAt(0) != '#') {playerClanAttempt = '#' + playerClanAttempt}
        if (playerClanAttempt == clanTag) {
        const clanProfile = new Discord.MessageEmbed()
            .setColor('#eb0e0e')
            .setTitle('Clan Page: ' + clanName)
            .setAuthor('Clash of Clans Bot', 'https://freepngimg.com/download/clash_of_clans/93475-heart-clash-of-boom-royale-clans-beach.png', "https://www.github.com/Popboy11")
            .setThumbnail(clanBadgePicture)
            .addField('Description', clanDescription)
            .addField('<:Shield:729448537900712057> General Information', '**Clan Name:** ' + clanName + '\n**Clan Tag:** ' + clanTag + '\n**Clan Level:** ' + clanLevel + '<:XP:729417604443275395>\n**Clan Trophies:** ' + clanTrophies + '<:ClashTrophy:729403373463273495>\n**Clan Versus Trophies:** ' + clanVersusTrophies + '<:ClashVersusTrophy:729406008610258994>\n**Trophy Requirement:** ' + clanReqTrophies + '<:ClashTrophy:729403373463273495>\n**Clan Members:** ' + clanMembersCount + '\n**Location:** ' + clanLocationName + ' :earth_americas:')
            if (clanPublicWarLog == true) {
                clanProfile.addField('<:Clan_Wars:730127465015672944> War Stats', '**War Log:** ' + clanPublicWarLogDisplay + ' :eye:\n**War Wins:** ' + clanWarWinsDisplay + ' <:War_Win:730075790091223062>\n**War Losses:** ' + clanWarLossesDisplay + ' <:War_Loss:730075790536081508>\n**War Ties:** ' + clanWarTies + ' <:War_Tie:730075792356278352>\n**CWL League:** ' + clanCWLLeague + ' ' + clanCWLLeagueIcon + '\n**War Win Streak:** ' + clanWarWinStreak + ' :fire:\n**Win/Loss Ratio:** ' + clanWarWinLossRatio + ' ' + clanWarWinLossIcon)
            } else {
                clanProfile.addField('<:Clan_Wars:730127465015672944> War Stats', '**War Log:** ' + clanPublicWarLogDisplay + ':lock:\n**War Wins:** ' + clanWarWinsDisplay + ' <:War_Win:730075790091223062>\n**CWL League:** ' + clanCWLLeague + ' ' + clanCWLLeagueIcon + '\n**War Win Streak:** ' + clanWarWinStreak + ' :fire:')    
            }
            clanProfile.addField('<:Loot_Cart1:729771834823934002> Labels', clanLabelsOneIcon + ' **' + clanLabelsOne + '**\n' + clanLabelsTwoIcon + ' **' + clanLabelsTwo + '**\n' + clanLabelsThreeIcon + ' **' + clanLabelsThree + '**', true)
            channelSentIn.send(clanProfile)
        } else {
            channelSentIn.send('Please use a valid clan tag! Example: #PVV9VYPJ, you used: ' + clanRestOfMessage)
            console.log(clanCommandAuthor + ' didn\'t use a valid clan tag, they used: ' + clanRestOfMessage)
        }
    } else {
        channelSentIn.send('Please include a clan tag! Example: #PVV9VYPJ')
        console.log(clanCommandAuthor + ' didn\'t include a clan tag, they used: ' + clanRestOfMessage)
    }
}


bot.on('message', message=>{
        let args = message.content.split(" ");
        switch(args[0]){
            case 'nice':
        case 'Nice':
            case 'nice.':
        case 'Nice.':
                if (!args[1])
                message.channel.send('Very nice indeed.')
                break;
        }
    })

String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
}


async function timeChecking() {
    while (timerGoing == 1) {
        timeCheck = Date.now()
        console.log(timeCheck);
        if (timeCheck > newTimetoRemind) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAA')
            channelTimer.send('Time\'s up! <@' + personTimer + '>')
            }
        await sleep(200);
        }
}

async function reminderNameCheckLoop() {
    while (true) {
    await sleep(500);
    timeCheck = Date.now()
    fs.readdir('./Reminders/', (err, files) => {
        files.forEach(file => {
            var fileSliceCache = (file.slice(0, -4))
            if (timeCheck > fileSliceCache) {
                var fileReadingAttempt = fs.readFileSync('./Reminders/' + fileSliceCache + '.txt', 'utf8')
                    var fileReadingAttemptSplit = fileReadingAttempt.split("\n")
                    var reminderLoopPersonToPing = fileReadingAttemptSplit[0]
                    var reminderLoopMessage = fileReadingAttemptSplit[2]
                    var reminderLoopChannelId = fileReadingAttemptSplit[3]
                    var reminderChannel = bot.channels.cache.get(reminderLoopChannelId.slice(2, -1))
                    reminderChannel.send('**[REMINDER]** ' + reminderLoopPersonToPing + ', ' + reminderLoopMessage)
                    fs.unlinkSync('./Reminders/' + fileSliceCache + '.txt')
                }
        });
      }); 
     }
}

function setTerminalTitle(title)
{
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//Invite Link: https://discordapp.com/oauth2/authorize?client_id=729106896107339786&scope=bot&permissions=8


bot.login('');