import { BetPosition } from "@/constants";
import { formatBigIntToFixed } from "@/utils/format";
import { useEffect, useMemo, useRef, useState } from "react";
import CountUp from "react-countup";
import "./index.css";

const TextStrokerMap = {
  [BetPosition.HOUSE]: `rgb(144, 103, 223) 6px 0px 0px, rgb(144, 103, 223) 5.91686px 0.995377px 0px, rgb(144, 103, 223) 5.66974px 1.96317px 0px, rgb(144, 103, 223) 5.2655px 2.87655px 0px, rgb(144, 103, 223) 4.71532px 3.71022px 0px, rgb(144, 103, 223) 4.03447px 4.44106px 0px, rgb(144, 103, 223) 3.24181px 5.04883px 0px, rgb(144, 103, 223) 2.35931px 5.51667px 0px, rgb(144, 103, 223) 1.41143px 5.83163px 0px, rgb(144, 103, 223) 0.424423px 5.98497px 0px, rgb(144, 103, 223) -0.574341px 5.97245px 0px, rgb(144, 103, 223) -1.55719px 5.79441px 0px, rgb(144, 103, 223) -2.49688px 5.45578px 0px, rgb(144, 103, 223) -3.36738px 4.96596px 0px, rgb(144, 103, 223) -4.14455px 4.33852px 0px, rgb(144, 103, 223) -4.80686px 3.59083px 0px, rgb(144, 103, 223) -5.33596px 2.74364px 0px, rgb(144, 103, 223) -5.71718px 1.8204px 0px, rgb(144, 103, 223) -5.93995px 0.84672px 0px, rgb(144, 103, 223) -5.99811px -0.150428px 0px, rgb(144, 103, 223) -5.89004px -1.14341px 0px, rgb(144, 103, 223) -5.61874px -2.1047px 0px, rgb(144, 103, 223) -5.19172px -3.00766px 0px, rgb(144, 103, 223) -4.62082px -3.82727px 0px, rgb(144, 103, 223) -3.92186px -4.54081px 0px, rgb(144, 103, 223) -3.11421px -5.12852px 0px, rgb(144, 103, 223) -2.22026px -5.57409px 0px, rgb(144, 103, 223) -1.26477px -5.86518px 0px, rgb(144, 103, 223) -0.274238px -5.99373px 0px, rgb(144, 103, 223) 0.723898px -5.95617px 0px, rgb(144, 103, 223) 1.70197px -5.75355px 0px, rgb(144, 103, 223) 2.63288px -5.39147px 0px, rgb(144, 103, 223) 3.49082px -4.87998px 0px, rgb(144, 103, 223) 4.25202px -4.23324px 0px, rgb(144, 103, 223) 4.89538px -3.46919px 0px, rgb(144, 103, 223) 5.40307px -2.60899px 0px, rgb(144, 103, 223) 5.76102px -1.67649px 0px, rgb(144, 103, 223) 5.95932px -0.697531px 0px`,
  [BetPosition.BULL]: `rgb(18, 158, 125) 5px 0px 0px, rgb(18, 158, 125) 4.90033px 0.993347px 0px, rgb(18, 158, 125) 4.60531px 1.94709px 0px, rgb(18, 158, 125) 4.12668px 2.82321px 0px, rgb(18, 158, 125) 3.48353px 3.58678px 0px, rgb(18, 158, 125) 2.70151px 4.20736px 0px, rgb(18, 158, 125) 1.81179px 4.6602px 0px, rgb(18, 158, 125) 0.849836px 4.92725px 0px, rgb(18, 158, 125) -0.145998px 4.99787px 0px, rgb(18, 158, 125) -1.13601px 4.86924px 0px, rgb(18, 158, 125) -2.08073px 4.54649px 0px, rgb(18, 158, 125) -2.94251px 4.04248px 0px, rgb(18, 158, 125) -3.68697px 3.37732px 0px, rgb(18, 158, 125) -4.28444px 2.57751px 0px, rgb(18, 158, 125) -4.71111px 1.67494px 0px, rgb(18, 158, 125) -4.94996px 0.7056px 0px, rgb(18, 158, 125) -4.99147px -0.291871px 0px, rgb(18, 158, 125) -4.83399px -1.27771px 0px, rgb(18, 158, 125) -4.48379px -2.2126px 0px, rgb(18, 158, 125) -3.95484px -3.05929px 0px, rgb(18, 158, 125) -3.26822px -3.78401px 0px, rgb(18, 158, 125) -2.4513px -4.35788px 0px, rgb(18, 158, 125) -1.53666px -4.75801px 0px, rgb(18, 158, 125) -0.560763px -4.96845px 0px, rgb(18, 158, 125) 0.437495px -4.98082px 0px, rgb(18, 158, 125) 1.41831px -4.79462px 0px, rgb(18, 158, 125) 2.34258px -4.41727px 0px, rgb(18, 158, 125) 3.17346px -3.86382px 0px, rgb(18, 158, 125) 3.87783px -3.15633px 0px, rgb(18, 158, 125) 4.4276px -2.32301px 0px, rgb(18, 158, 125) 4.80085px -1.39708px 0px, rgb(18, 158, 125) 4.98271px -0.415447px 0px`,
  [BetPosition.BEAR]: `rgb(209, 66, 147) 5px 0px 0px, rgb(209, 66, 147) 4.90033px 0.993347px 0px, rgb(209, 66, 147) 4.60531px 1.94709px 0px, rgb(209, 66, 147) 4.12668px 2.82321px 0px, rgb(209, 66, 147) 3.48353px 3.58678px 0px, rgb(209, 66, 147) 2.70151px 4.20736px 0px, rgb(209, 66, 147) 1.81179px 4.6602px 0px, rgb(209, 66, 147) 0.849836px 4.92725px 0px, rgb(209, 66, 147) -0.145998px 4.99787px 0px, rgb(209, 66, 147) -1.13601px 4.86924px 0px, rgb(209, 66, 147) -2.08073px 4.54649px 0px, rgb(209, 66, 147) -2.94251px 4.04248px 0px, rgb(209, 66, 147) -3.68697px 3.37732px 0px, rgb(209, 66, 147) -4.28444px 2.57751px 0px, rgb(209, 66, 147) -4.71111px 1.67494px 0px, rgb(209, 66, 147) -4.94996px 0.7056px 0px, rgb(209, 66, 147) -4.99147px -0.291871px 0px, rgb(209, 66, 147) -4.83399px -1.27771px 0px, rgb(209, 66, 147) -4.48379px -2.2126px 0px, rgb(209, 66, 147) -3.95484px -3.05929px 0px, rgb(209, 66, 147) -3.26822px -3.78401px 0px, rgb(209, 66, 147) -2.4513px -4.35788px 0px, rgb(209, 66, 147) -1.53666px -4.75801px 0px, rgb(209, 66, 147) -0.560763px -4.96845px 0px, rgb(209, 66, 147) 0.437495px -4.98082px 0px, rgb(209, 66, 147) 1.41831px -4.79462px 0px, rgb(209, 66, 147) 2.34258px -4.41727px 0px, rgb(209, 66, 147) 3.17346px -3.86382px 0px, rgb(209, 66, 147) 3.87783px -3.15633px 0px, rgb(209, 66, 147) 4.4276px -2.32301px 0px, rgb(209, 66, 147) 4.80085px -1.39708px 0px, rgb(209, 66, 147) 4.98271px -0.415447px 0px`,
};

export const WaveCircle = ({
  pricePool,
  progress,
  position,
}: {
  pricePool: bigint;
  price: bigint;
  progress: number;
  position: BetPosition;
}) => {
  const [innerPos, setInnerPos] = useState(position);
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    setInnerPos(position);
  }, [position]);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (innerPos !== BetPosition.HOUSE) {
        setInnerPos(BetPosition.HOUSE);
      } else {
        setInnerPos(position);
      }
    }, 5000);
    return () => window.clearInterval(timerRef.current);
  }, [innerPos, position]);
  const waveColor =
    innerPos === BetPosition.HOUSE
      ? "bg-t-secondary/50"
      : innerPos === BetPosition.BEAR
      ? "bg-t-sell/50"
      : "bg-t-buy/50";
  const shadowColor =
    innerPos === BetPosition.HOUSE
      ? "shadow-[0px_0px_6px_6px_rgba(144,103,223,0.14)]"
      : innerPos === BetPosition.BEAR
      ? "shadow-[0px_0px_6px_6px_rgba(237,106,175,0.3)]"
      : "shadow-[0px_0px_6px_6px_rgba(87,213,184,0.33)]";
  const waveTops = useMemo(() => {
    // 87 92 97
    const baseTop = 87;
    const baseTops = [baseTop, baseTop + 5, baseTop + 5 * 2];
    return baseTops.map((x) => Math.floor(x - 80 * progress));
  }, [progress]);
  return (
    <div
      className={`w-[131px] h-[131px] rounded-full bg-interactive-interactive01 mx-auto relative overflow-visible`}
    >
      <div
        className={`wave-shadow shadow-animation absolute left-0 top-0 bottom-0 right-0 rounded-full ${shadowColor}`}
      />
      <div
        className={`wave-container absolute left-0 top-0 bottom-0 right-0 rounded-full mx-auto overflow-hidden`}
      >
        <div className="mx-auto absolute bottom-[10px] text-center z-10 w-full">
          <p className="text-t-white font-semibold text-[8.7px] leading-3 uppercase">
            Reward Pool
          </p>
        </div>
        <CountUp
          start={0}
          preserveValue
          delay={0}
          end={Number(formatBigIntToFixed(pricePool * BigInt(1e4), 4, 22))}
          prefix="$"
          decimals={4}
          duration={1}
        >
          {({ countUpRef }) => (
            <div
              className="absolute bottom-[28px] text-[29px] font-kanit font-semibold text-t-white w-full text-center z-10 duration-500 transition-all"
              style={{
                filter: "drop-shadow(rgba(0,0,0,0.15) 0px 2px)",
                textShadow: TextStrokerMap[innerPos],
              }}
            >
              <p ref={countUpRef} />
              <p className="mt-0.5 text-2xl">BNB</p>
            </div>
          )}
        </CountUp>

        <div
          style={{ top: `${waveTops[0]}%` }}
          className={`wave-01 absolute w-[300%] h-[300%] -left-[100%] ${waveColor} rounded-[45%]`}
        ></div>
        <div
          style={{ top: `${waveTops[1]}%` }}
          className={`wave-02 absolute w-[300%] h-[300%] -left-[100%] ${waveColor} rounded-[43%]`}
        ></div>
        <div
          style={{ top: `${waveTops[2]}%` }}
          className={`wave-03 absolute w-[300%] h-[300%] -left-[100%] ${waveColor} rounded-[40%]`}
        ></div>
      </div>
    </div>
  );
};
