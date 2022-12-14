<template>
  <div class="col-md-10">
    <div class="Video">
      <button
        type="submit"
        size="sm"
        style="top: 5px,
        left: 5px"
        @click="showRoom(chatRoom)"
        class="btn btn-primary mb-2 Botton"
      >
        CONNECT
      </button>
      <b-button
        v-if="this.microphone == true"
        variant="primary"
        size="sm"
        class="border-0"
        style="top: 5px,
        left: 5px"
        @click="mute_audio"
        ><i class="fa fa-microphone"></i
      ></b-button>
      <b-button
        v-if="this.microphone == false"
        variant="primary"
        size="sm"
        class="border-0"
        style="top: 5px,
        left: 5px"
        @click="unmute_audio"
      >
        <i class="fas fa-microphone-slash"></i
      ></b-button>
      <b-button
        v-if="this.camera == true"
        variant="primary"
        size="sm"
        class="border-0"
        style="top: 5px,
        left: 5px"
        @click="mute_video"
        ><i class="fas fa-video"></i
      ></b-button>
      <b-button
        v-if="this.camera == false"
        variant="primary"
        size="sm"
        class="border-0"
        style="top: 5px,
        left: 5px"
        @click="unmute_video"
        ><i class="fas fa-video-slash"></i
      ></b-button>
      <button
        type="submit"
        size="sm"
        style="top: 5px,
        left: 5px"
        @click="leaveRoomIfJoined(chatRoom)"
        class="btn btn-danger mb-2 Botton"
      >
        LEAVE
      </button>
    </div>
    <div class="embed-responsive embed-responsive-16by9">
      <div class="row remote_video_container"></div>
      <div id="remoteTrack"></div>
      <div id="localTrack"></div>
    </div>
  </div>
</template>
<script>
import EventBus from '../Event';
import Twilio, { connect, createLocalTracks, createLocalVideoTrack } from 'twilio-video';
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      data: {},
      localTrack: false,
      remoteTrack: '',
      activeRoom: '',
      previewTracks: '',
      identity: '',
      roomName: null,
    };
  },
  props: ['chatRoom'], // props that will be passed to this component
  created() {
    EventBus.$on('show_room', (room_name) => {
      this.createChat(room_name);
    });

    // When a user is about to transition away from this page,
    // disconnect from the room, if joined.
    window.addEventListener('beforeunload', this.leaveRoomIfJoined);
  },
  methods: {
    async getAccessToken() {
      return await axios.get(`http://localhost:3000/getTwilioToken`);
    },
    // Trigger log events
    dispatchLog(message) {
      EventBus.$emit('new_log', message);
    },
    // Attach the Tracks to the DOM.
    attachTracks(tracks, container) {
      tracks.forEach(function (track) {
        container.appendChild(track.attach());
      });
    },
    // Attach the Participant's Tracks to the DOM.
    attachParticipantTracks(participant, container) {
      let tracks = Array.from(participant.tracks.values());
      this.attachTracks(tracks, container);
    },
    // Detach the Tracks from the DOM.
    detachTracks(tracks) {
      tracks.forEach((track) => {
        track.detach().forEach((detachedElement) => {
          detachedElement.remove();
        });
      });
    },
    // Detach the Participant's Tracks from the DOM.
    detachParticipantTracks(participant) {
      let tracks = Array.from(participant.tracks.values());
      this.detachTracks(tracks);
    },
    // Leave Room.
    leaveRoomIfJoined() {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }
    },
    showRoom(room) {
      this.room_name = room;
      this.createChat(props.chatRoom);
      window.addEventListener('beforeunload', this.leaveRoomIfJoined);
      this.startDate = new Date();
      console.log('start date', this.startDate);
    },
    createChat(room_name) {
      this.loading = true;
      const VueThis = this;

      this.getAccessToken().then((data) => {
        VueThis.roomName = null;
        const token = data.data;
        let connectOptions = {
          name: room_name,
          // logLevel: 'debug',
          audio: true,
          video: { width: 400 },
        };
        // before a user enters a new room,
        // disconnect the user from they joined already
        this.leaveRoomIfJoined();

        // remove any remote track when joining a new room
        document.getElementById('remoteTrack').innerHTML = '';

        Twilio.connect(token, connectOptions).then(function (room) {
          // console.log('Successfully joined a Room: ', room);
          VueThis.dispatchLog('Successfully joined a Room: ' + room_name);

          // set active toom
          VueThis.activeRoom = room;
          VueThis.roomName = room_name;
          VueThis.loading = false;

          // Attach the Tracks of the Room's Participants.
          room.participants.forEach(function (participant) {
            let previewContainer = document.getElementById('remoteTrack');
            VueThis.attachParticipantTracks(participant, previewContainer);
          });

          // When a Participant joins the Room, log the event.
          room.on('participantConnected', function (participant) {
            VueThis.dispatchLog("Joining: '" + participant.identity + "'");
          });

          // When a Participant adds a Track, attach it to the DOM.
          room.on('trackAdded', function (track, participant) {
            VueThis.dispatchLog(participant.identity + ' added track: ' + track.kind);
            let previewContainer = document.getElementById('remoteTrack');
            VueThis.attachTracks([track], previewContainer);
          });

          // When a Participant removes a Track, detach it from the DOM.
          room.on('trackRemoved', function (track, participant) {
            VueThis.dispatchLog(participant.identity + ' removed track: ' + track.kind);
            VueThis.detachTracks([track]);
          });

          // When a Participant leaves the Room, detach its Tracks.
          room.on('participantDisconnected', function (participant) {
            VueThis.dispatchLog("Participant '" + participant.identity + "' left the room");
            VueThis.detachParticipantTracks(participant);
          });

          // if local preview is not active, create it
          if (!VueThis.localTrack) {
            createLocalVideoTrack().then((track) => {
              let localMediaContainer = document.getElementById('localTrack');

              localMediaContainer.appendChild(track.attach());
              VueThis.localTrack = true;
            });
          }
        });
      });
    },
  },
};
</script>

<style>
.remote_video_container {
  left: 0;
  margin: 0;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  position: absolute;
}
#localTrack video {
  width: 100px !important;
  background-repeat: no-repeat;
  height: 100px;
  position: absolute;
  z-index: 2;
}
.spacing {
  padding: 20px;
  width: 100%;
}
.Video {
  padding: 4px;
  color: rgb(3, 11, 19);
}
.col-md-10 {
  background-color: lightgray;
  height: auto;
}
</style>
