import Image from "next/image";
import styles from "./CourseCard.module.css";

function CourseCard({ data }) {
  return (
    <div>
      <div>
        <Image src={data.image} alt={data.title} width={500} height={500} />
      </div>
      <div>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <p>Rating: {data.rating}</p>
      </div>
    </div>
  );
}

export default CourseCard;
