export default class RoomManager {
  constructor(scene) {
    this.scene = scene;
    this.rooms = {};
    this.currentRoom = null;
  }

  addRoom(name, data) {
    this.rooms[name] = data;
  }

  loadRoom(name) {
    const roomData = this.rooms[name];
    if (!roomData) {
      console.warn(`Room "${name}" not found`);
      return;
    }

    this._clearCurrentRoom();

    this.currentRoom = {
      name,
      props: []
    };

    roomData.forEach(prop => {
      const sprite = this._createProp(prop);
      this.currentRoom.props.push(sprite);
    });
  }

  _clearCurrentRoom() {
    if (this.currentRoom && this.currentRoom.props) {
      this.currentRoom.props.forEach(obj => obj.destroy());
    }
    this.currentRoom = null;
  }

  _createProp(prop) {
    const sprite = this.scene.physics.add.sprite(prop.x, prop.y, prop.key)
      .setOrigin(0, 0)
      .setImmovable(true)
      .setDisplaySize(prop.width, prop.height);

    if (prop.bodySize) {
      sprite.body.setSize(prop.bodySize.width, prop.bodySize.height);
    }

    if (prop.bodyOffset) {
      sprite.body.setOffset(prop.bodyOffset.x, prop.bodyOffset.y);
    }

    if (this.scene.player && this.scene.player.body) {
      this.scene.physics.add.collider(this.scene.player, sprite);
    } else {
      this.scene.events.once('player-ready', () => {
        this.scene.physics.add.collider(this.scene.player, sprite);
      });
    }

    return sprite;
  }
}
