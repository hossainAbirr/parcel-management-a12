import CountUp from 'react-countup';
const MyCountUp = ({ start, end, decimal }) => {
    return (
        <CountUp
            start={start}
            end={end}
            enableScrollSpy={true}
            scrollSpyDelay={500}
            duration={3.5}
            separator=" "
            decimals={decimal}
            decimal=""
            onEnd={() => console.log('Ended! 👏')}
            onStart={() => console.log('Started! 💨')}
        >
            {({ countUpRef }) => (
                <div className='text-center'>
                    <span className='text-4xl text-white text-center font-bold' ref={countUpRef} />
                </div>
            )}
        </CountUp >
    );
};

export default MyCountUp;