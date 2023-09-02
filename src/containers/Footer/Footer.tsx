function Footer() {
  return (
    <footer className='w-full p-4 pb-10 bg-[#f5f5f5]'>
      <div className='max-w-7xl mx-auto '>
        <div className='grid grid-rows-12 lg:grid-cols-12 gap-4  items-center '>
          <div className='grid-row-full lg:col-span-4 text-center lg:text-left'>
            <p className='text-[14px] text-neutral-500'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</p>
          </div>
          <div className='grid-row-full lg:col-span-8'>
            <ul className='list-none flex'>
              <li className='text-neutral-500 text-[14px]'>Quốc gia & Khu vực:</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Singapore</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Indonesia</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Đài Loan</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Thái Lan</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Malaysia</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Việt Nam</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>
                Philippines
              </li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Brazil</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>México</li>
              <li className='px-1 border-r border-solid border-r-[#c4c4c4] text-neutral-500 text-[14px]'>Colombia</li>
              <li className='px-1   text-neutral-500 text-[14px]'>Chile</li>
            </ul>
          </div>
        </div>
        <div className='mt-6 text-neutral-500 text-[12px] text-center'>
          <div>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
