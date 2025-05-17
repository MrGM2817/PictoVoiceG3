function WordCard({ word, isUsed, isSelected, showResults, matchedImage, correctAssociations, color, onClick }) {
    let backgroundColor = 'white';

    if (showResults) {
        const correct = correctAssociations[matchedImage] === word;
        backgroundColor = correct ? '#F2FFEC' : '#FFF2F2';
    } else {
        backgroundColor = (isUsed || isSelected) ? color : 'white';
    }

    return (
        <div
            onClick={() => onClick(word)}
            style={{ backgroundColor }}
            className={`shadow-md rounded-lg text-center cursor-pointer w-32 h-32 flex items-center justify-center font-semibold transition-all duration-200
                ${isSelected ? 'ring-2 ring-blue-400' : ''}
            `}
        >
            {word}
        </div>
    );
}

export default WordCard;
