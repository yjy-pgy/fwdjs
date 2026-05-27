// 平滑滚动到联系表单
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// 平滑滚动到项目概述
function scrollToOverview() {
  document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });
}

// 关闭弹窗
function closeModal() {
  document.getElementById('successModal').classList.remove('show');
}

// 获取申请记录
function getApplications() {
  const data = localStorage.getItem('applications');
  return data ? JSON.parse(data) : [];
}

// 保存申请记录
function saveApplications(applications) {
  localStorage.setItem('applications', JSON.stringify(applications));
}

// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
  // 导航栏滚动效果
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // 导航链接点击平滑滚动
  const navLinks = document.querySelectorAll('.navbar-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 表单提交处理
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(form);
    const data = {
      storeName: formData.get('storeName'),
      contactName: formData.get('contactName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      orders: formData.get('orders'),
      singleStoreOrders: formData.get('singleStoreOrders'),
      message: formData.get('message'),
      submitTime: new Date().toLocaleString('zh-CN')
    };
    
    // 保存到localStorage
    const applications = getApplications();
    applications.push(data);
    saveApplications(applications);
    
    // 显示成功弹窗
    document.getElementById('successModal').classList.add('show');
    
    // 重置表单
    form.reset();
  });
  
  // 点击弹窗外部关闭
  const modal = document.getElementById('successModal');
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // ESC键关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // 输入框聚焦效果
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});