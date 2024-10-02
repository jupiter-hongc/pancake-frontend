export const LivePaused = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div
      id="canceled-round"
      className={
        "rounded-3xl bg-background-bg1 border overflow-hidden transition-all duration-500 max-h-[215px] border-border-line"
      }
      style={style}
    >
      <div
        className={
          "flex justify-between h-10 items-center text-t-white px-4 py-2 transition-all bg-[rgb(182,182,182)]"
        }
      >
        <div className="flex gap-1 items-center">
          <span className="text-t-white text-base font-semibold">
            Prediction Paused
          </span>
        </div>
      </div>
      <>
        <div>
          <div className={"h-2 bg-[rgb(155,155,155)]"}>
            <div
              className={"h-full bg-[rgb(126,126,126)]"}
              style={{ width: "2%" }}
            ></div>
          </div>
        </div>
        <div
          className="mx-auto relative text-center px-11 py-10 flex flex-col items-center gap-1.5"
          style={{
            background: `linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)`,
          }}
        >
          <div className="flex gap-4 items-center">
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              className="shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2803_2597)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M59.8096 13.0513C60.4976 14.6101 60.4116 16.1122 59.6338 17.4594C58.8559 18.8067 57.598 19.6322 55.9041 19.8158C54.1595 20.0049 51.8627 19.5127 49.186 17.9673C46.5092 16.4219 44.9346 14.6789 44.2261 13.0735C43.5381 11.5147 43.6241 10.0126 44.4019 8.66531C45.1797 7.31806 46.4376 6.49255 48.1316 6.30895C49.8762 6.11986 52.1729 6.61205 54.8497 8.15747C57.5264 9.70288 59.1011 11.4458 59.8096 13.0513ZM62.8115 11.7264C61.7416 9.30225 59.5722 7.09519 56.4903 5.31583C53.4084 3.53647 50.4123 2.7613 47.778 3.04682C45.093 3.33784 42.8857 4.72889 41.5603 7.0247C40.2348 9.3205 40.1337 11.9275 41.2242 14.3983C42.2941 16.8225 44.4634 19.0296 47.5454 20.8089C50.6273 22.5883 53.6233 23.3635 56.2577 23.0779C58.9427 22.7869 61.1499 21.3959 62.4754 19.1001C63.8009 16.8043 63.902 14.1972 62.8115 11.7264Z"
                  fill="#FFAF00"
                />
                <path
                  d="M52.7744 16.6215C53.1369 15.9938 52.9218 15.1911 52.294 14.8286L50.3502 13.7063C49.7224 13.3439 48.9197 13.559 48.5573 14.1867L45.5219 19.4441C45.1595 20.0718 45.3746 20.8745 46.0024 21.237L47.9462 22.3592C48.574 22.7217 49.3767 22.5066 49.7391 21.8788L52.7744 16.6215Z"
                  fill="#EB8C00"
                />
                <path
                  d="M57.636 14.4296C57.9984 13.8019 57.7833 12.9992 57.1556 12.6367L49.8179 8.40031C49.1901 8.03787 48.3874 8.25296 48.025 8.88072L46.3998 11.6956C46.0374 12.3233 46.2525 13.126 46.8802 13.4885L54.2179 17.7249C54.8457 18.0873 55.6484 17.8722 56.0108 17.2445L57.636 14.4296Z"
                  fill="#FFAF00"
                />
                <path
                  d="M57.636 14.4296C57.9984 13.8019 57.7833 12.9992 57.1556 12.6367L51.514 9.37953C50.8862 9.01709 50.0835 9.23218 49.7211 9.85993L48.4223 12.1094C48.0599 12.7372 48.275 13.5399 48.9027 13.9023L54.5443 17.1595C55.1721 17.522 55.9748 17.3069 56.3372 16.6791L57.636 14.4296Z"
                  fill="#FFD800"
                />
                <path
                  d="M56.8334 13.2082C57.0146 12.8943 56.9071 12.493 56.5932 12.3118L55.4684 11.6624C55.1545 11.4812 54.7532 11.5887 54.572 11.9026L52.617 15.2888C52.4357 15.6026 52.5433 16.004 52.8572 16.1852L53.9819 16.8346C54.2958 17.0158 54.6972 16.9083 54.8784 16.5944L56.8334 13.2082Z"
                  fill="#FFE971"
                />
                <path
                  d="M19.7368 50.641C25.8965 61.31 39.1985 64.1053 50.012 57.8621C60.8256 51.6189 65.0558 38.7014 58.8961 28.0324C52.7363 17.3635 39.4343 14.5682 28.6208 20.8114C17.8073 27.0546 13.577 39.9721 19.7368 50.641Z"
                  fill="#EB8C00"
                />
                <path
                  d="M17.8236 47.3276C23.9833 57.9965 37.2853 60.7918 48.0988 54.5486C58.9124 48.3054 63.1426 35.3879 56.9828 24.719C50.8231 14.05 37.5211 11.2547 26.7076 17.4979C15.8941 23.7411 11.6638 36.6586 17.8236 47.3276Z"
                  fill="#FFD800"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.1058 30.1857C16.9422 27.6942 18.243 25.3339 19.959 23.2206L59.7633 33.6533C59.968 36.2818 59.6607 38.9019 58.8898 41.3994L16.1058 30.1857ZM53.1174 50.7995C54.2781 49.6562 55.3007 48.4149 56.1753 47.0991L15.0161 36.3112C14.9764 37.8413 15.1075 39.3848 15.419 40.9188L53.1174 50.7995Z"
                  fill="#FFE971"
                />
                <path
                  d="M20.5346 45.7624C25.8931 55.0436 37.3913 57.5177 46.7075 52.1389C56.0238 46.7601 59.6303 35.5654 54.2718 26.2843C48.9134 17.0031 37.4152 14.529 28.0989 19.9078C18.7826 25.2866 15.1762 36.4813 20.5346 45.7624Z"
                  fill="#FFC700"
                />
                <path
                  d="M22.5562 44.3944C27.2251 52.4813 37.1645 54.4355 45.3162 49.7291C53.4679 45.0226 56.7452 35.4378 52.0763 27.351C47.4073 19.2641 37.468 17.3099 29.3163 22.0163C21.1645 26.7228 17.8873 36.3076 22.5562 44.3944Z"
                  fill="white"
                />
                <path
                  d="M26.6982 25.8791C25.529 26.9561 27.3141 27.7134 28.6436 26.842C31.1195 25.2193 34.0844 24.2834 37.2749 24.2996C41.8724 24.3229 46.0214 26.3184 48.9255 29.4848C49.9113 30.5597 51.7154 30.0599 50.9862 28.7968C46.5832 21.1706 37.3314 19.2576 29.7938 23.6095C28.6543 24.2674 27.6192 25.0308 26.6982 25.8791Z"
                  fill="#E7E8E8"
                />
                <path
                  d="M46.6859 46.724C47.9059 45.705 46.1489 44.9125 44.7755 45.7127C42.5803 46.9916 40.0241 47.7178 37.2927 47.7044C32.9569 47.683 29.0444 45.8022 26.306 42.8169C25.3762 41.8033 23.6746 42.2746 24.3623 43.4658V43.4658C28.5137 50.6562 37.2387 52.4587 44.3481 48.3541C45.1891 47.8686 45.9698 47.3221 46.6859 46.724Z"
                  fill="#E7E8E8"
                />
                <path
                  d="M43.9629 27.4824C44.2347 27.0116 44.0734 26.4095 43.6026 26.1377L43.1939 25.9018C42.7231 25.6299 42.1211 25.7913 41.8493 26.2621L37.9524 33.0116C37.6806 33.4824 37.8419 34.0845 38.3127 34.3563L38.7214 34.5922C39.1922 34.864 39.7942 34.7027 40.066 34.2319L43.9629 27.4824Z"
                  fill="#452A7A"
                />
                <path
                  d="M28.7713 36.6979C28.2461 36.8386 27.9345 37.3783 28.0752 37.9035L28.2044 38.3855C28.3451 38.9106 28.8848 39.2222 29.41 39.0815L35.509 37.4473C36.0341 37.3066 36.3457 36.7668 36.205 36.2417L36.0759 35.7597C35.9351 35.2346 35.3954 34.9229 34.8703 35.0636L28.7713 36.6979Z"
                  fill="#452A7A"
                />
                <path
                  d="M34.4746 34.1534C35.492 32.3911 37.5698 31.9144 39.2374 32.8772C40.905 33.84 41.531 35.8777 40.5136 37.64C39.4961 39.4022 37.4184 39.8789 35.7508 38.9161C34.0832 37.9533 33.4572 35.9156 34.4746 34.1534Z"
                  fill="#452A7A"
                />
                <path
                  d="M23.1835 19.4778C22.3988 19.0247 21.2735 19.5048 20.67 20.55L15.152 30.1076C14.5485 31.1528 14.6954 32.3674 15.4801 32.8204L16.2446 33.2618C17.0293 33.7148 18.1546 33.2348 18.7581 32.1896L24.2762 22.632C24.8796 21.5868 24.7327 20.3722 23.948 19.9192L23.1835 19.4778Z"
                  fill="#EB8C00"
                />
                <path
                  d="M2.99412 37.9556C-1.02835 35.6332 0.242035 26.5923 5.46302 17.5493C10.684 8.50624 17.8785 2.88558 21.901 5.20796C25.9234 7.53034 24.6531 16.5713 19.4321 25.6143C14.2111 34.6573 7.0166 40.278 2.99412 37.9556Z"
                  fill="#FFC700"
                />
                <path
                  d="M4.83299 38.1479C1.7033 36.3638 3.35034 28.2918 8.22497 19.9551C13.0996 11.6185 19.3559 6.17406 22.4856 7.95821C25.6153 9.74235 23.9682 17.8144 19.0936 26.151C14.219 34.4877 7.96268 39.9321 4.83299 38.1479Z"
                  fill="#FFD800"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.60014 31.1919C3.93508 29.6198 4.48939 27.8718 5.2427 26.0262L24.0296 10.5662C24.1831 11.6713 24.0978 13.0331 23.7936 14.5745L3.60014 31.1919ZM21.3106 21.8363C21.8264 20.7196 22.2757 19.628 22.6543 18.5775L3.22739 34.5641C3.24264 35.2883 3.33778 35.9317 3.51683 36.4789L21.3106 21.8363Z"
                  fill="#FFE971"
                />
              </g>
              <defs>
                <clipPath id="clip0_2803_2597">
                  <rect
                    width="64"
                    height="64"
                    fill="white"
                    transform="matrix(-1 0 0 1 64.5 0)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="text-left text-sm text-t-primary">
              Sorry, Prediction is currently paused, please try to revisit in a
              while.
            </p>
          </div>
        </div>
      </>
    </div>
  );
};
