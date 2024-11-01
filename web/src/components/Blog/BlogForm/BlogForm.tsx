import type { EditBlogById, UpdateBlogInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormBlog = NonNullable<EditBlogById['blog']>

interface BlogFormProps {
  blog?: EditBlogById['blog']
  onSave: (data: UpdateBlogInput, id?: FormBlog['id']) => void
  error: RWGqlError
  loading: boolean
}

const BlogForm = (props: BlogFormProps) => {
  const onSubmit = (data: FormBlog) => {
    props.onSave(data, props?.blog?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormBlog> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="source"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Source
        </Label>

        <TextField
          name="source"
          defaultValue={props.blog?.source}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="source" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.blog?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.blog?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="htmlContent"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Html content
        </Label>

        <TextField
          name="htmlContent"
          defaultValue={props.blog?.htmlContent}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="htmlContent" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm
