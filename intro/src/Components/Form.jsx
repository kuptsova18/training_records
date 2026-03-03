function Form({ date, distance, onDateChange, onDistanceChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className='training-form'>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
          <input
            type="text"
            id="date"
            placeholder='ДД.ММ.ГГГГ'
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='distance'>Пройдено км</label>
          <input
            type="number"
            id="distance"
            step="0.1"
            min="0"
            placeholder='0.0'
            value={distance}
            onChange={(e) => onDistanceChange(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn-ok'>ОК</button>
      </div>
    </form>
  );
}

export default Form;
