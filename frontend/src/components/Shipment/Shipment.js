import { useContext } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import './Shipment.css';

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = (data) => console.log(data);

  console.log(watch('name')); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        {...register('name', { required: true })}
        placeholder='You Name'
      />
      {errors.name && <span className='error'>Name is required</span>}
      <input
        defaultValue={loggedInUser.email}
        {...register('email', { required: true })}
        placeholder='You Email'
      />

      {errors.email && <span className='error'>Email is required</span>}
      <input
        {...register('address', { required: true })}
        placeholder='You Address'
      />
      {errors.address && <span className='error'>Address is required</span>}
      <input
        {...register('phone', { required: true })}
        placeholder='You Number'
      />
      {errors.phone && <span className='error'>Phone is required</span>}
      <input type='submit' />
    </form>
  );
};

export default Shipment;
