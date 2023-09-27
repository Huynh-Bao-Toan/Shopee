import type { Meta, StoryObj } from '@storybook/react'

import DateSelect from './DateSelect'

const meta: Meta<typeof DateSelect> = {
  title: 'Components/DateSelect',
  component: DateSelect,
  parameters: {
    docs: {
      description: {
        component: 'Đây là DateSelect component'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: {
      description: 'Truyền lỗi khi không thỏa điều kiện validate',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      description: 'Ngày, tháng, năm',
      table: {
        defaultValue: {
          summary: '1-1-1990'
        },
        type: { summary: 'Date' }
      }
    },
    onChange: {
      description: 'Thực hiện thay đổi trên DateSelect',
      table: {
        type: { summary: '(value: Date) => void' }
      }
    }
  }
}
type Story = StoryObj<typeof DateSelect>

export const Primary: Story = {
  args: {
    value: new Date(1990, 0, 1),
    errorMessage: '',
    onChange: () => {}
  }
}

export default meta
