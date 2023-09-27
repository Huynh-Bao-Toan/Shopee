import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Đây là Input component'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: {
      description: 'Lỗi hiển thị khi validate không thành công',
      table: {
        type: { summary: 'string' }
      }
    },
    register: {
      description: 'Được truyền vào từ react-hook-form',
      table: {
        type: { summary: 'UseFormRegister<any>' }
      }
    },
    classWrapper: {
      description: 'class css cao nhất của component',
      table: {
        defaultValue: {
          summary: 'min-h-[70px] mb-1'
        },
        type: { summary: 'string' }
      }
    },
    classInput: {
      description: 'class css cho thẻ input',
      table: {
        defaultValue: {
          summary: 'border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5'
        },
        type: { summary: 'string' }
      }
    },
    classError: {
      description: 'class css cho thẻ p có nội dung lỗi khi validate',
      table: {
        defaultValue: {
          summary: 'mt-1 text-sm text-red-600 dark:text-red-500'
        },
        type: { summary: 'string' }
      }
    }
  }
}
type Story = StoryObj<typeof Input>

export const Primary: Story = {
  args: {
    errorMessage: '',
    classError: 'mt-1 text-sm text-red-600 dark:text-red-500',
    classWrapper: 'min-h-[70px] mb-1',
    classInput: 'border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5'
  }
}

export default meta
