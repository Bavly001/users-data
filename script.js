const body = document.querySelector('body');
const header = document.querySelector('header');

document.addEventListener('scroll', () => {

      let scrollPos = window.pageYOffset;

      if (scrollPos > 80) {
            header.classList.add('shadow');
            header.classList.add('sticky-top');
      } else {
            header.classList.remove('shadow');
            header.classList.remove('sticky-top');
      }


});

if (body.id === "users-list") {

      const view_users = document.querySelector('#view-users');

      function checkNumber(button) {
            document.querySelectorAll('.page-link').forEach(btn => {
                  if (btn.classList.contains('active')) {
                        btn.classList.remove('active');
                  }
            })
            button.classList.add('active');
            fetchUsers(button.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const createButtons = (number) => {
            const numbers_list = document.querySelector('#numbers-list')
            numbers_list.innerHTML = ''
            for (let i = 1; i <= number; i++) {
                  numbers_list.innerHTML += `
                <li class="page-item"><button onclick = "checkNumber(this);" id="${i}" class="page-link">
                ${i}
                </button></li>  
            `
            }
      }

      const pagination = (array, page, page_size) => {
            view_users.innerHTML = '';
            const start = (page - 1) * page_size
            const end = start + page_size;
            const new_array = array.slice(start, end);
            let pages = Math.ceil(array.length / page_size);

            createButtons(pages);

            new_array.map(user => {
                  view_users.innerHTML += `
                  <div class="col d-flex justify-content-center align-items-center">
                              <div class="card bg-dark text-bg-dark text-center py-3 px-2 hover overflow-hidden">
                                    <i class="fa fa-user-circle display-1" aria-hidden="true"></i>
                                    <div class="card-body text-start">
                                          <h4 class="card-title fs-3">${user.firstName + " " + user.lastName}</h4><br><br>
                                          <p class="card-text fs-5">ID: ${user.id}</p>
                                          <p class="card-text fs-5">Age: ${user.age}</p>
                                          <p class="card-text fs-5">Gender: ${user.gender}</p>
                                          <p class="card-text fs-5">Email: ${user.email}</p>
                                          <p class="card-text fs-5">Phone: ${user.phone}</p>
                                    </div>
                              </div>
                        </div>
                        `
            })
      }


      const viewUsers = (array, page) => {
            pagination(array, page, 15);
      }

      const catchError = () => {
            view_users.innerHTML = '';
            view_users.className -= ('row-cols-lg-3 row-cols-md-2 row-cols-sm-1');
            view_users.innerHTML += '<h1 class="display-4 col-12 text-center text-danger">There is no users yet</h1>';
            view_users.innerHTML += '<h1 class="display-6 col-12 text-center text-muted fs-4">I think we facing some errors we are fixing them yet</h1>';
      }

      function fetchUsers(num) {
            let page;
            if (num === null) page = 1;
            else page = num;
            fetch('https://dummyjson.com/users?limit=70')
                  .then(res => res.json())
                  .then(users => viewUsers(users.users, page))
                  .catch(() => {
                        catchError();
                  });
      }

      fetchUsers(null);
}
else {

      const form = document.getElementById('form')
      const f_name = document.getElementById('first-name')
      const l_name = document.getElementById('last-name')
      const age = document.getElementById('age')
      const gender = document.getElementById('gender')
      const email = document.getElementById('email')
      const phone = document.getElementById('phone')
      const text = document.getElementById('text')


      class User {
            constructor(f_name, l_name, age, gender, email, phone) {
                  this.f_name = f_name;
                  this.l_name = l_name;
                  this.age = age;
                  this.gender = gender;
                  this.email = email;
                  this.phone = phone;
            }
      }

      form.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = new User(f_name.value, l_name.value, age.value, gender.value, email.value, phone.value)

            fetch('https://dummyjson.com/users/add', {
                  method: 'POST',
                  body: JSON.stringify(user)
            })
                  .then((response) => {
                        console.log(response)
                        text.innerHTML = "User is added successfully."
                        text.classList.add('text-success')
                  })
                  .catch((err) => {
                        console.log(err)
                        text.innerHTML = "We are facing some issues, please try again later..."
                        text.classList.add('text-danger')
                  });
      })

      const checkDropDownList = () => {
            if (gender.value === "") gender.classList.add('text-muted');
            else gender.classList.remove('text-muted');
      }
      checkDropDownList();
      gender.addEventListener('change', checkDropDownList);
}