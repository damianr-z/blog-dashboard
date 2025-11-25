import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useRegister } from './useRegister';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register: registerField,
    formState,
    getValues,
    handleSubmit,
    reset,
    label,
  } = useForm();
  const { errors } = formState;

  const { register: registerUser, isLoading } = useRegister();

  async function onSubmit(data) {
    const { name, email, password } = data;
    await registerUser({ name, email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        visibility="visible"
        label="Full name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...registerField('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        visibility="visible"
        label="Email address"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...registerField('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        visibility="visible"
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...registerField('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        visibility="visible"
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...registerField('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} type="submit">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
