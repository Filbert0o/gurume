<template>
  <div class="wrapper">
    <h2 class="how-title">Skill Progress bar</h2>
    <br />
    <h3 class="how-title1">Learners Achievements</h3>
    <div class="skill" v-for="(achievement, idx) in learnersAchievements" :key="idx">
      <p>{{ achievement.title }}</p>
      <p class="desc">{{ achievement.unit }}</p>
      <div
        class="skill-bar skill1"
        :style="{ width: currentUserAchievement(achievement.id) + '%' }"
      >
        <span class="skill-count1">{{ currentUserAchievement(achievement.id) }}</span>
      </div>
    </div>
    <h3 class="how-title1">Guru Achievements</h3>
    <div class="skill" v-for="(achievement, idx) in guruAchievements" :key="idx">
      <p>{{ achievement.title }}</p>
      <p class="desc">{{ achievement.unit }}</p>
      <div
        class="skill-bar skill1"
        :style="{ width: currentUserAchievement(achievement.id) + '%' }"
      >
        <span class="skill-count1">{{ currentUserAchievement(achievement.id) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { watch, computed } from 'vue';

export default {
  components: {},
  setup() {
    const store = useStore();
    const currentUser = computed(() => store.getters['currentUser']);

    const currentUserAchievement = (id) => {
      const achievement = currentUser.value?.achievements.find((x) => x.id === id);
      if (id === 2) return 40;
      return achievement ? achievement.progress : 0;
    };
    const learnersAchievements = [
      { id: 1, title: 'Time Learning', unit: 'hours', availableToAchieve: 1000, amountOfSteps: 10 },
      { id: 2, title: 'Gurus Talked To', unit: 'amount', availableToAchieve: 30, amountOfSteps: 5 },
      { id: 3, title: 'Questions Asked', unit: 'hours', availableToAchieve: 30, amountOfSteps: 5 },
      // { title: 'Time Learning', unit: 'hours', availableToAchieve: 1000, amountOfSteps: 10 }
    ];

    const guruAchievements = [
      { id: 1, title: 'Time Teaching', unit: 'hours', availableToAchieve: 1000, amountOfSteps: 10 },
      {
        id: 2,
        title: 'Learners Talked To',
        unit: 'amount',
        availableToAchieve: 30,
        amountOfSteps: 5,
      },
      {
        id: 3,
        title: 'Questions Answered',
        unit: 'hours',
        availableToAchieve: 30,
        amountOfSteps: 5,
      },
    ];

    const availableRoles = ['web-developer', 'vue-developer', 'business', 'hardware'];

    return {
      availableRoles,
      currentUser,
      currentUserAchievement,
      learnersAchievements,
      guruAchievements,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');

.wrapper {
  width: 800px;
  font-family: 'Roboto', sans-serif;
  margin: 0 auto;
}

.skill {
  margin-bottom: 35px;
  position: relative;
  overflow-x: hidden;
}

.skill > p {
  font-size: 20px;
  font-weight: 700;
  color: #f9f4f3;
  margin: 0;
}

.skill:before {
  width: 100%;
  height: 10px;
  content: '';
  display: block;
  position: absolute;
  background: #959595;
  bottom: 0;
  border-radius: 50px;
}

.skill-bar {
  width: 100%;
  height: 10px;
  background: #f4392f;
  display: block;
  position: absolute;
  border-radius: 50px;
}

.skill-bar span {
  position: absolute;
  border-top: 5px solid #00000000;
  top: -30px;
  padding: 0;
  font-size: 18px;
  padding: 3px 0;
  font-weight: 500;
}

.how-title {
  margin-top: 80px;
  color: #ff8b88;
  text-align: center;
}
.skill-bar {
  position: relative;
}

.skill1 {
  width: 95%;
}

.skill1 .skill-count1 {
  right: 0;
}

.skill2 {
  width: 85%;
}

.skill2 .skill-count2 {
  right: 0;
}

.skill3 {
  width: 75%;
}

.skill3 .skill-count3 {
  right: 0;
}

.skill4 {
  width: 97%;
}

.skill4 .skill-count4 {
  right: 0;
}

.skill5 {
  width: 88%;
}

.skill5 .skill-count5 {
  right: 0;
}

.skill6 {
  width: 66%;
}

.skill6 .skill-count6 {
  right: 0;
}

.desc {
  font-family: 'Nectar', sans-serif;
  font-weight: 100 !important;
  font-size: medium !important;
  color: #bcaeae !important;
}
</style>
