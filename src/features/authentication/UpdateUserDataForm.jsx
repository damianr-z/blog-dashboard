import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

export default function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  // Get current name from Clerk user
  const currentFirstName = user?.firstName || '';
  const currentLastName = user?.lastName || '';
  const currentEmail = user?.primaryEmailAddress?.emailAddress || '';

  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);
  const [avatar, setAvatar] = useState(null);

  if (!user) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName && !lastName) return;

    updateUser(
      {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        avatar,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFirstName(currentFirstName);
    setLastName(currentLastName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={currentEmail} disabled />
      </FormRow>

      <FormRow label="First name">
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="firstName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Last name">
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}
