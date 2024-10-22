import leoProfanity from 'leo-profanity';

const enBadWords = leoProfanity.getDictionary('en');
const ruBadWords = leoProfanity.getDictionary('ru');

export default leoProfanity.addDictionary('badWords', [...enBadWords, ...ruBadWords]);
