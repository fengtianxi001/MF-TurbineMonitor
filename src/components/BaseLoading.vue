<template>
  <div class="base-loading">
    <div class="cube">
      <div class="sides">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>
    <div class="loading__text">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$size: 100px;
$halfSize: calc(#{$size} / 2);
$borderWidth: calc(#{$size} / 10);
$bgc: rgba(91, 193, 227, 0.8);
.base-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background-color: rgba(#000, 0.2);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 0;
  left: 0;
  & * {
    position: absolute;
    width: $size;
    height: $size;
  }
  .cube {
    width: calc(#{$size} * 3);
    height: calc(#{$size} * 3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .sides {
      animation: rotate 3s ease infinite;
      animation-delay: 0.8s;
      transform-style: preserve-3d;
      transform: rotateX(-37.5deg) rotateY(45deg);
      & * {
        box-sizing: border-box;
        background-color: $bgc;
        border: $borderWidth solid white;
      }
      .top {
        animation: top-animation 3s ease infinite;
        animation-delay: 0ms;
        transform: rotateX(90deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
      .front {
        animation: front-animation 3s ease infinite;
        animation-delay: 100ms;
        transform: rotateY(0deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
      .back {
        animation: back-animation 3s ease infinite;
        animation-delay: 100ms;
        transform: rotateY(-180deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
      .bottom {
        animation: bottom-animation 3s ease infinite;
        animation-delay: 0ms;
        transform: rotateX(-90deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
      .left {
        animation: left-animation 3s ease infinite;
        animation-delay: 100ms;
        transform: rotateY(-90deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
      .right {
        animation: right-animation 3s ease infinite;
        animation-delay: 100ms;
        transform: rotateY(90deg) translateZ($size);
        animation-fill-mode: forwards;
        transform-origin: 50% 50%;
      }
    }
  }
  .loading__text {
    position: relative;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size:20px;
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(-37.5deg) rotateY(45deg);
  }
  50% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
  100% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
}

@keyframes top-animation {
  0% {
    opacity: 1;
    transform: rotateX(90deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateX(90deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateX(90deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateX(90deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateX(90deg) translateZ($size);
  }
}

@keyframes bottom-animation {
  0% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ($size);
  }
}

@keyframes front-animation {
  0% {
    opacity: 1;
    transform: rotateY(0deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateY(0deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateY(0deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateY(0deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg) translateZ($size);
  }
}

@keyframes back-animation {
  0% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ($size);
  }
}

@keyframes left-animation {
  0% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ($size);
  }
}

@keyframes right-animation {
  0% {
    opacity: 1;
    transform: rotateY(90deg) translateZ($size);
  }
  20% {
    opacity: 1;
    transform: rotateY(90deg) translateZ($halfSize);
  }
  70% {
    opacity: 1;
    transform: rotateY(90deg) translateZ($halfSize);
  }
  90% {
    opacity: 1;
    transform: rotateY(90deg) translateZ($size);
  }
  100% {
    opacity: 1;
    transform: rotateY(90deg) translateZ($size);
  }
}
</style>
