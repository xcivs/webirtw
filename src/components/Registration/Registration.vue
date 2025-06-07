<template>
  <section class="registration">
    <div class="registration__form">
      <h2>Your Name</h2>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />

      <div class="registration__gender">
        <label><input type="radio" name="gender" /> Male</label>
        <label><input type="radio" name="gender" /> Female</label>
      </div>

      <h2>Login details</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <p class="registration__hint">
        Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters
      </p>

      <button class="registration__button">
        JOIN NOW <span class="arrow">→</span>
      </button>
    </div>

    <div class="registration__perks">
      <h2>LOYALTY HAS ITS PERKS</h2>
      <p>
        Get in on the loyalty program where you can earn points and unlock serious perks. Starting with these as soon as you join:
      </p>
      <ul>
        <li> 15% off welcome offer</li>
        <li> Free shipping, returns and exchanges on all orders</li>
        <li> $10 off a purchase on your birthday</li>
        <li> Early access to products</li>
        <li> Exclusive offers & rewards</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// По необходимости — добавить работу с v-model, валидацией и отправкой формы
</script>

<style scoped lang="scss">
@use '/src/styles/main.scss';    

.registration {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 40px 20px;
  max-width: 1140px;
  margin: 0 auto;

  &__form,
  &__perks {
    flex: 1;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      padding: 12px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    h2 {
      margin: 10px 0 4px;
      font-size: 16px;
      font-weight: 500;
    }

    &__gender {
      display: flex;
      gap: 20px;
      margin: 10px 0;
    }

    .registration__hint {
      font-size: 12px;
      color: #B1B1B1;
    }

    .registration__button {
        margin-top: 10px;
        width: 151px;
        background-color: #f26376;
        color: white;
        border: none;
        padding: 12px 24px;
        font-weight: bold;
        cursor: pointer;
      .arrow {
        margin-left: 8px;
      }
    }
  }

  &__perks {
    h2 {
      font-size: 20px;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      margin-bottom: 16px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 16px;
        margin-bottom: 10px;
        &::before {
          content: '✓ ';
          color: #000;
        }
      }
    }
  }
}

// Адаптивность
@media (max-width: 767px) {
  .registration {
    flex-direction: column;
    gap: 40px;
  }
}
</style>
