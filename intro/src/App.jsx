import { useState, useEffect } from 'react'
import './App.css'
import Form from './Components/Form';
import Data from './Components/Data';

function App() {
  const [trainings, setTrainings] = useState(() => {
    const savedTrainings = localStorage.getItem('trainings');
    return savedTrainings ? JSON.parse(savedTrainings) : [];
  });
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);

  const validateDate = (dateStr) => {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    return regex.test(dateStr);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance) {
      alert("Проверьте, указана ли дата и дистанция!");
      return;
    }
    if (!validateDate(date)) {
      alert('Пожалуйста, введите дату в формате ДД.ММ.ГГГГ');
      return;
    }
    const distanceNum = parseFloat(distance);
    if (distanceNum <= 0 || isNaN(distanceNum)) {
      alert('Пожалуйста, введите корректное расстояние');
      return;
    }

    const indexTrainig = trainings.findIndex(t => t.date === date);

    if (indexTrainig !== -1) {
      const sumDistance = trainings[indexTrainig].distance + distanceNum;

      const updateTrainings = [...trainings];

      updateTrainings[indexTrainig] = {
        ...updateTrainings[indexTrainig], distance: sumDistance
      };
      updateTrainings.sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split('.');
        const [bDay, bMonth, bYear] = b.date.split('.');

        const dateA = new Date(aDay, aMonth - 1, aYear);
        const dateB = new Date(bDay, bMonth - 1, bYear);
        return dateB - dateA;
      });

      setTrainings(updateTrainings);

    } else {
      const newRecord = {
        id: Date.now(),
        date: date,
        distance: distanceNum
      };
      const updateTrainings = [...trainings, newRecord].sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split('.');
        const [bDay, bMonth, bYear] = b.date.split('.');

        const dateA = new Date(aDay, aMonth - 1, aYear);
        const dateB = new Date(bDay, bMonth - 1, bYear);
        return dateB - dateA;
      });
      setTrainings(updateTrainings);
    }
    setDate('');
    setDistance('');
  }

  const handleDelete = (id) => {
    setTrainings(prevTrainings => prevTrainings.filter(item => item.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setDate('');
      setDistance('');
    }
  }
 const handleEdit = (training) => {

    setDate(training.date);
    setDistance(training.distance);
    setEditingId(training.id);
  }
 return (
    <div className='app'>
      <h1>Учет тренировок</h1>
      <Form
        date={date}
        distance={distance}
        onDateChange={setDate}
        onDistanceChange={setDistance}
        onSubmit={handleSubmit}
      />
      <Data trainings={trainings} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App