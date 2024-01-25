import React from "react";
import { Link } from "react-router-dom";
import styles from "./TariffCard.module.css";
import Tick from "../../assets/images/Tick-image.svg";

function TariffCard({ isPurchased, color, title, prices, details }) {
  const { primaryColor, secondaryColor } = color;
  const [header, subTitle, icon] = title;

  return (
    <div
      style={isPurchased ? { border: `1px solid ${primaryColor}` } : { border: "none" }}
      className={styles.tariffCard}
    >
      <div
        style={{ backgroundColor: primaryColor, color: secondaryColor }}
        className={styles.tariffHeader}
      >
        <div className={styles.tariffInfo}>
          <header>{header}</header>
          <div>{subTitle}</div>
        </div>
        <div className={styles.tariffImage}>
          <img src={icon} alt="TariffImage" />
        </div>
      </div>
      <div className={styles.currentTarifContainer}>
        {isPurchased ? (
          <div className={styles.currentTariff}>Текущий тариф</div>
        ) : (
          <div className={styles.emptyLine}></div>
        )}
      </div>
      <div className={styles.prices}>
        <div className={styles.currentPrice}>{prices[0]}</div>
        <div className={styles.oldPrice}>{prices[1]}</div>
      </div>
      <div>
        {prices[2] ? (
          <div className={styles.creditPrice}>{prices[2]}</div>
        ) : (
          <div className={styles.emptyCredit}></div>
        )}
      </div>
      <div className={styles.detailsTitle}>В тариф входит:</div>
      <div className={styles.details}>
        {details.map((detail, index) => (
          <div key={index} className={styles.detailsText}>
            <img src={Tick} alt="Галочка" />
            {detail}
          </div>
        ))}
      </div>
      {isPurchased ? (
        <div className={styles.toMyAccount}>
          <Link to={"#"}>Перейти в личный кабинет</Link>
        </div>
      ) : (
        <div className={styles.aboutTariff}>
          <Link to={"#"}>Подробнее</Link>
        </div>
      )}
    </div>
  );
}

export default TariffCard;
