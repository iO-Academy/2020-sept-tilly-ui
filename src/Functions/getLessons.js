import getDate from "./getDate";

export default function getLessons(user) {
    let lessons = [];
    user.lessons.forEach(lesson => {
        const newDate = getDate(lesson.id)
        lessons.unshift({id: lesson.id, lesson: lesson.lesson, date: newDate, username: user.username})
    })
    return lessons;
}