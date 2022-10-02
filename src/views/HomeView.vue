<template>
  <UserList />
  <div>
    <div class="search__container">
      <p class="search__title">Ask me a Question</p>
      <input
        v-model="helpRequest"
        class="search__input"
        type="text"
        placeholder="start typing..."
      />
      <button
        v-if="helpRequest !== ''"
        type="button"
        @click="createHelpRequestQuestion"
        class="btn btn-outline-light create-request"
      >
        Request Help
      </button>
    </div>

    <div class="container card-area">
      <template v-for="(helpReq, idx) in helpRequestList" :key="idx">
        <div class="card" v-if="canCurrentUserHelp(helpReq.rolesNeeded)">
          <div class="card-header">{{ helpReq.name }} Needs Help</div>
          <div class="card-body">
            <h5 class="card-title">{{ helpReq.question }}</h5>
            <!-- <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p> -->
            <a @click="connectToChatRoom" class="btn btn-primary">Chat!</a>
          </div>
        </div>
      </template>

      <div class="card">
        <div class="card-header">Filbert Needs Help</div>
        <div class="card-body">
          <h5 class="card-title">How to start vue project?</h5>
          <!-- <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p> -->
          <a @click="connectToChatRoom" class="btn btn-primary">Chat!</a>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Pikachu Needs Help</div>
        <div class="card-body">
          <h5 class="card-title">How to create twilio with auth0?</h5>
          <!-- <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p> -->
          <a @click="connectToChatRoom" class="btn btn-primary">Chat!</a>
        </div>
      </div>
    </div>
    <div id="video-container"></div>
    <!-- <VideoChat :chatRoom="chatRoom" v-if="joinChat" /> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import UserCreate from '@/components/UserCreate.vue';
import UserList from '@/components/UserList.vue';
import VideoChat from '@/components/VideoChat.vue';
import { connect } from 'twilio-video';
import { createHelpRequest, useLoadHelpRequest } from '@/firebase';
import { useStore } from 'vuex';

export default {
  components: { UserList },
  setup() {
    // const { connect } = 'twilio-video';
    const store = useStore();

    const currentUser = computed(() => store.getters['getCurrentUser']);

    const helpRequest = ref('');

    const helpRequestList = useLoadHelpRequest();

    const canCurrentUserHelp = (roles) => {
      for (const role of roles) {
        for (const cuRole of currentUser.value?.roles) {
          if (role === cuRole) return true;
        }
      }
      return false;
    };

    const createHelpRequestQuestion = async () => {
      console.log(helpRequest.value);
      await createHelpRequest({
        rolesNeeded: ['web-developer', 'vue-developer'],
        question: helpRequest.value,
        userWhoMadeId: currentUser.value?.sub,
        userWhoMadeName: currentUser.value?.name,
        status: 'pending',
      });
    };

    const handleTrackPublication = (trackPublication, participant) => {
      function displayTrack(track) {
        // append this track to the participant's div and render it on the page
        const participantDiv = document.getElementById(participant.identity);
        // track.attach creates an HTMLVideoElement or HTMLAudioElement
        // (depending on the type of track) and adds the video or audio stream
        participantDiv.append(track.attach());
      }

      // check if the trackPublication contains a `track` attribute. If it does,
      // we are subscribed to this track. If not, we are not subscribed.
      if (trackPublication.track) {
        displayTrack(trackPublication.track);
      }

      // listen for any new subscriptions to this track publication
      trackPublication.on('subscribed', displayTrack);
    };

    const joinChat = ref(false);
    const chatRoom = ref(null);

    const connectToChatRoom = () => {
      connect(localStorage.getItem('twilioJWT'), {
        audio: true,
        name: 'dev-room',
        video: { width: 640 },
      }).then(
        (room) => {
          chatRoom.value = room;
          joinChat.value = true;
          console.log(`Successfully joined a Room: ${room}`);
          room.on('participantConnected', (participant) => {
            console.log(`A remote Participant connected: ${participant}`);
            const participantDiv = document.createElement('div');
            participantDiv.setAttribute('id', participant.identity);
            container.appendChild(participantDiv);

            // iterate through the participant's published tracks and
            // call `handleTrackPublication` on them
            participant.tracks.forEach((trackPublication) => {
              handleTrackPublication(trackPublication, participant);
            });

            // listen for any new track publications
            participant.on('trackPublished', handleTrackPublication);
          });
        },
        (error) => {
          console.error(`Unable to connect to Room: ${error.message}`);
        }
      );
    };

    return {
      currentUser,
      helpRequestList,
      helpRequest,
      canCurrentUserHelp,
      createHelpRequestQuestion,
      joinChat,
      chatRoom,
      connectToChatRoom,
    };
  },
};
</script>

<style lang="scss" scoped>
.search__container {
  padding-top: 64px;
}

.search__title {
  font-size: 22px;
  font-weight: 900;
  text-align: center;
  color: #ff8b88;
}

.create-request {
  transition: transform 250ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  // margin-top: 40px;
  left: 65%;
  border-radius: 20px;
}

.search__input {
  width: 30%;
  padding: 12px 24px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 35%;

  color: #ffffff;
  background-color: transparent;
  /*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */

  // background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTc0LjUzMzMzLDE3LjJjLTMxLjU5NjQyLDAgLTU3LjMzMzMzLDI1LjczNjkyIC01Ny4zMzMzMyw1Ny4zMzMzM2MwLDMxLjU5NjQyIDI1LjczNjkyLDU3LjMzMzMzIDU3LjMzMzMzLDU3LjMzMzMzYzEzLjczOTk4LDAgMjYuMzU4MzQsLTQuODc5MTUgMzYuMjQ3NjYsLTEyLjk3ODM5bDM0LjIzMjAzLDM0LjIzMjAzYzEuNDM4MDIsMS40OTc3OCAzLjU3MzQsMi4xMDExMyA1LjU4MjYsMS41NzczNWMyLjAwOTIsLTAuNTIzNzggMy41NzgyNiwtMi4wOTI4NCA0LjEwMjA0LC00LjEwMjA0YzAuNTIzNzgsLTIuMDA5MiAtMC4wNzk1NywtNC4xNDQ1OCAtMS41NzczNSwtNS41ODI2bC0zNC4yMzIwMywtMzQuMjMyMDNjOC4wOTkyNCwtOS44ODkzMiAxMi45NzgzOSwtMjIuNTA3NjggMTIuOTc4MzksLTM2LjI0NzY2YzAsLTMxLjU5NjQyIC0yNS43MzY5MiwtNTcuMzMzMzMgLTU3LjMzMzMzLC01Ny4zMzMzM3pNNzQuNTMzMzMsMjguNjY2NjdjMjUuMzk5MzcsMCA0NS44NjY2NywyMC40NjczIDQ1Ljg2NjY3LDQ1Ljg2NjY3YzAsMjUuMzk5MzcgLTIwLjQ2NzI5LDQ1Ljg2NjY3IC00NS44NjY2Nyw0NS44NjY2N2MtMjUuMzk5MzcsMCAtNDUuODY2NjcsLTIwLjQ2NzI5IC00NS44NjY2NywtNDUuODY2NjdjMCwtMjUuMzk5MzcgMjAuNDY3MywtNDUuODY2NjcgNDUuODY2NjcsLTQ1Ljg2NjY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+');
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #ffffff;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.search__input::placeholder {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search__input:hover,
.search__input:focus {
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #ffffff;
  border-radius: 0;
  background-position: 100% center;
}

.card {
  background-color: black;
  color: white;
  margin-bottom: 30px;
}

.card-area {
  margin-top: 100px;
}
</style>
