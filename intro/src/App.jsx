import { useState, useEffect } from 'react'
import './App.css'

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
    <>
      <div className='app'>
        <h1>Учет тренировок</h1>
        <form onSubmit={handleSubmit} className='training-form'>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
              <input
                type="text"
                id="date"
                placeholder='ДД.ММ.ГГГГ'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required>
              </input>
            </div>
            <div className='form-group'>
              <label htmlFor='distance'>Пройдено км.</label>
              <input
                type="number"
                id="distance"
                step="0.1"
                min="0"
                placeholder='0.0'
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                required>
              </input>
            </div>
            <button type='submit' className='btn-ok'>ОК</button>
          </div>
        </form>

        <div className='tableBox'>
          <table className='trainings-table'>
            <thead>
              <tr>
                <th>Дата (ДД.ММ.ГГГГ)</th>
                <th>Пройдено км</th>
                <th>Действия</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='tableBox'>
          <table className='trainings-table training'>
            <tbody>

              {trainings.length === 0 ? (
                <tr>
                  <td colSpan="3" className='empty-message'>Нет данных о тренировках</td>
                </tr>) :
                (trainings.map(training => (
                  <tr key={training.id}>
                    <td>{training.date}</td>
                    <td>{training.distance.toFixed(1)}</td>
                    <td>
                      <button className='btn-edit'
                        onClick={() => handleEdit(training)}
                        title='Изменить'>✎</button>
                      <button className='btn-delete'
                        onClick={() => handleDelete(training.id)}
                        title='Удалить'>✗</button>
                    </td>
                  </tr>
                )))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  )
}

export default App
