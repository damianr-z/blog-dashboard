import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createEditBlog } from '../../services/apiBlogs';

import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import TextArea from '../../ui/TextArea';
import FormRow from '../../ui/FormRow';

import { useCreateBlog } from './useBlogs';
// import { useUpdateBlog } from './useUpdateBlog';

function CreateBlogForm({ blogToEdit = {}, onCloseModal }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createEditBlog,
    onSuccess: () => {
      toast.success('New blog successfully created');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //   const { isCreating, createBlog } = useCreateBlog();
  //   const { isUpdating, updateBlog } = useUpdateBlog();
  //   const isWorking = isCreating;

  const { id: editId, ...editValues } = blogToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });

    // if (isUpdateSession)
    //   updateBlog(
    //     { newBlogData: { ...data, image }, id: updateId },
    //     {
    //       onSuccess: (data) => {
    //         console.log('Blog updated', data);
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else
    //   createBlog(
    //     { ...data, image: image },
    //     {
    //       onSuccess: (data) => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'title'} error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          placeholder="Title"
          disabled={isCreating}
          {...register('title', {
            required: 'This field is required',
            minLength: {
              value: 5,
              message: 'title must be at least 5 characters long',
            },
          })}
        />
      </FormRow>

      <FormRow label={'text area'} error={errors?.body?.message}>
        <TextArea
          id="body"
          placeholder="write..."
          defaultValue=""
          disabled={isCreating}
          {...register('body', {
            required: 'This field is required',
            minLength: {
              value: 5,
              message: 'body must be at least 5 characters long',
            },
          })}
        ></TextArea>
      </FormRow>

      <FormRow label={'categories'} error={errors?.categories?.message}>
        <Input
          type="text"
          id="categories"
          placeholder="categories"
          disabled={isCreating}
          {...register('categories', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Category must be at least 3 characters long',
            },
          })}
        />
      </FormRow>

      <FormRow label={'image upload'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating} type="submit">
          {isEditSession ? 'Edit blog' : 'Create new blog'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBlogForm;
