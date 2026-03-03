function Data({ trainings, onEdit, onDelete }) {
  return (
    <div className='tableBox'>
      <table className='trainings-table'>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {trainings.length === 0 ? (
            <tr>
              <td colSpan="3" className='empty-message'>Нет данных о тренировках</td>
            </tr>
          ) : (
            trainings.map(training => (
              <tr key={training.id}>
                <td>{training.date}</td>
                <td>{training.distance.toFixed(1)}</td>
                <td>
                  <button className='btn-edit' onClick={() => onEdit(training)} title='Изменить'>✎</button>
                  <button className='btn-delete' onClick={() => onDelete(training.id)} title='Удалить'>✗</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
