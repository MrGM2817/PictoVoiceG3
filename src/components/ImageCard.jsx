function ImageCard({
                       word,
                       image,
                       assignedWord,
                       overlayColor,
                       showResults,
                       isCorrect,
                       onClick,
                       correctoIcon,
                       incorrectoIcon,
                       isSelected,
                   }) {
    const bgResultColor = showResults
        ? (isCorrect ? '#F2FFEC' : '#FFF2F2')
        : 'white';

    const showOverlay = !showResults && assignedWord;

    return (
        <div
            onClick={() => onClick(word)}
            className={`relative shadow-md rounded-lg flex items-center justify-center w-32 h-32 cursor-pointer transition-all duration-200 overflow-hidden
                ${isSelected ? 'ring-2 ring-blue-400' : ''}
            `}
            style={{ backgroundColor: bgResultColor }}
        >
            <img
                src={image}
                alt={`Cara ${word}`}
                className="w-full h-full object-contain"
            />

            {showOverlay && (
                <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                        backgroundColor: overlayColor,
                        opacity: 0.4,
                    }}
                />
            )}

            {showResults && (
                <img
                    src={isCorrect ? correctoIcon : incorrectoIcon}
                    alt={isCorrect ? 'Correcto' : 'Incorrecto'}
                    className="absolute top-2 right-2 w-6 h-6"
                />
            )}
        </div>
    );
}

export default ImageCard;
