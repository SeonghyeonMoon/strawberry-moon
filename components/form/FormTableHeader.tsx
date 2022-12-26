const FormTableHeader = () => {
  return (
    <thead>
      <tr className='p-2 text-left'>
        <th className='border p-2'>등급</th>
        <th className='border p-2'>수량(개)</th>
        <th className='border p-2'>단가(원)</th>
        <th className='border p-2'>판매금액(원)</th>
      </tr>
    </thead>
  );
};

export default FormTableHeader;
