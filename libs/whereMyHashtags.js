// function that returns an array of all the #hashtags
module.exports = (sentence) => {
    let hashtags = [];
    let splitSentence = sentence.split(' ');
    splitSentence.map( word => {
        (word.startsWith('#')) ? hashtags.push(word) : false;
    });
    return hashtags;
}