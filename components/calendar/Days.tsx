const Days = () => {
  return (
    <thead>
      <tr>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <td
            key={day}
            className={`py-5 text-center font-bold 
        ${day === '토' ? 'text-blue-600' : ''} 
        ${day === '일' ? 'text-red-600' : ''}`}
          >
            {day}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default Days;
