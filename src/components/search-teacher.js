"use client";

import Image from "next/image";
import styles from "./searchTeacher.module.css";
import { useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import TeacherCard from "./TeacherCard";

const data = [
  {
    _id: "1",
    name: "John Doe",
    email: "",
    phone: "",
    location: "",
    subjects: [],
    description:
      "I am a teacher, I teach things. I am a teacher, I teach things. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    rating: 4,
    skills: ["Node.js", "Javascript", "Html", "Css", "React", "Next.js"],
    image: "/images/teacher.png",
  },
  {
    _id: "2",
    name: "John Doe",
    email: "",
    phone: "",
    location: "",
    subjects: [],
    description:
      "I am a teacher, I teach things. I am a teacher, I teach things. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    rating: 4,
    skills: ["Node.js", "Javascript", "Html", "Css", "React", "Next.js"],
    image: "/images/teacher.png",
  },
  {
    _id: "3",
    name: "John Doe",
    email: "",
    phone: "",
    location: "",
    subjects: [],
    description:
      "I am a teacher, I teach things. I am a teacher, I teach things. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    rating: 4,
    skills: ["Node.js", "Javascript", "Html", "Css", "React", "Next.js"],
    image: "/images/teacher.png",
  },
];

function SearchTeacherPage({ query }) {
  const [total, setTotal] = useState(50);

  const [courses, setCourses] = useState([]);

  const [showCourses, setShowCourses] = useState([]);
  const [fetching, setFetching] = useState([]);

  const getCourses = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`/data/courses.json`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowCourses = async (e, i, id) => {
    e.preventDefault();
    if (showCourses.includes(i)) {
      setShowCourses(showCourses.filter((item) => item !== i));
      return;
    } else {
      setShowCourses([...showCourses, i]);
    }

    if (courses.find((course) => course.id === id)) {
      return;
    } else {
      setFetching([...fetching, i]);
      const data = await getCourses(id);
      setFetching(fetching.filter((item) => item !== i));
      if (data) setCourses([...courses, { id, data }]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Search Teacher</h1>
        <p>
          ({total}) results found for {query}.
        </p>
      </div>
      <div className={styles.cards}>
        {data.map((teacher, i) => (
          <TeacherCard key={i} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

export default SearchTeacherPage;
