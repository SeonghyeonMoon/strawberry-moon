import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <SyncLoader color='#48515f' />
    </div>
  );
};

export default Loading;
