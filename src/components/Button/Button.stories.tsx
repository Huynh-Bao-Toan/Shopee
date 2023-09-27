import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'
import { icons } from '~/assets/icons'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Đây là Button component'
      }
    },
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Nội dung bên trong thẻ button nếu nameBtn không được truyền vào',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    nameBtn: {
      description: 'Tên thẻ button',
      table: {
        type: { summary: 'string' }
      }
    },
    className: {
      description: 'class css cho component bằng tailwind',
      table: {
        defaultValue: {
          summary:
            'flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
        },
        type: { summary: 'string' }
      }
    }
  }
}
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: <img src={icons.search} alt='search-icon' className='w-5 h-5' />,
    nameBtn: 'Đăng nhập',
    className:
      'flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
  }
}

export default meta
