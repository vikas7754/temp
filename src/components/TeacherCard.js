import { useState } from "react";
import styles from "./TeacherCard.module.css";
import Image from "next/image";
import CourseCard from "./CourseCard";
import axios from "axios";

function TeacherCard({ teacher }) {
  const [showCourses, setShowCourses] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchCourses = async () => {
    if (total && courses.length === total) return setHasMore(false);
    try {
      setFetching(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`/data/courses.json`);
      console.log(data);
      setCourses([...courses, ...data.data]);
      setTotal(data.total);
      setPage(page + 1);
      setFetching(false);
      if (data.data?.total > data.data.length) setHasMore(true);
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  };

  const handleShowCourses = (e) => {
    e.preventDefault();
    setShowCourses(!showCourses);
    if (showCourses) return;
    fetchCourses();
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={teacher.image}
            alt={teacher.name}
            width={150}
            height={150}
          />
        </div>
        <div className={styles.info}>
          <h2>{teacher.name}</h2>
          <p className={styles.description}>{teacher.description}</p>
          <p className={styles.skills}>
            Skills:{" "}
            {teacher?.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </p>
          <div className={styles.rating}>
            <div className={styles.star}>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        Math.ceil(teacher.rating) >= i + 1
                          ? "rgb(255, 215, 0)"
                          : "black",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
            </div>
          </div>
          <div className={styles.btns}>
            <button onClick={handleShowCourses}>
              View Courses {showCourses ? total || "-" : "+"}
            </button>
            <a href={`mailto:${teacher.email}`}>Contact</a>
          </div>
        </div>
      </div>
      {showCourses && (
        <div className={styles.courses_container}>
          {!fetching && courses.length > 0 && (
            <div className={styles.courses}>
              {courses.map((course, i) => (
                <CourseCard key={i} data={course} />
              ))}
            </div>
          )}
          {hasMore && (
            <div>
              <button onClick={fetchCourses} disabled={fetching}>
                Load More
              </button>
            </div>
          )}
          {fetching && <p>Loading...</p>}
          {!fetching && courses.length === 0 && <p>No courses found</p>}
        </div>
      )}
    </div>
  );
}

export default TeacherCard;
