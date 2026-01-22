import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ currentPassword, newPassword }) {
    updateUser({ currentPassword, newPassword }, { onSuccess: () => reset() });
  }

  return (
    // DONE: add a field to validate previous password and only then have the new password entered
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current password"
        error={errors?.currentPassword?.message}
      >
        <Input
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          placeHolder="enter current password"
          disabled={isUpdating}
          {...register('currentPassword', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="password"
          id="newPassword"
          autoComplete="new-password"
          placeHolder="enter new password"
          disabled={isUpdating}
          {...register('newPassword', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm new password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          autoComplete="confirmed-password"
          placeHolder="confirm new password"
          id="confirmPassword"
          disabled={isUpdating}
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              getValues().newPassword === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
