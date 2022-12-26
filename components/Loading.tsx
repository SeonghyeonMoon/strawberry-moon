import { DotLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <DotLoader color='#48515f' />
    </div>
  );
};

export default Loading;
