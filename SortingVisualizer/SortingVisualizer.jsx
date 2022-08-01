import { render } from "@testing-library/react";
import React from "react";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "../SortingAlgorithms/sortingAlgorithms.js";

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    for (let k = 0; k < 5; k++) {
      setTimeout(() => {
        const array = [...Array(300).keys()].map((i) => {
          return i + 5;
        });
        for (let i = 0; i < array.length; i++) {
          let randI = Math.floor(Math.random() * array.length);
          let temp = array[randI];
          array[randI] = array[i];
          array[i] = temp;
        }
        this.setState({ array });
      }, k * 3);
    }
  }
  /**
   * Exchange Sorts
   */
  combSort() {
    const animations = sortingAlgorithms.combSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  oddEvenSort() {
    const animations = sortingAlgorithms.oddEvenSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  circleSort() {
    const animations = sortingAlgorithms.circleSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  bubbleSort() {
    const animations = sortingAlgorithms.bubbleSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  countingSort() {
    const animations = sortingAlgorithms.countingSort(this.state.array);
    this.animateBarsByReplacingValues(animations, 3);
  }
  mergeSort() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    this.animateBarsByReplacingValues(animations, 3);
  }
  /**
   * Selection Sorts
   */
  heapSort() {
    const animations = sortingAlgorithms.heapSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  selectionSort() {
    const animations = sortingAlgorithms.selectionSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  /**
   * Insertion Sorts
   */
  insertionSort() {
    const animations = sortingAlgorithms.insertionSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  shellSort() {
    const animations = sortingAlgorithms.shellSort(this.state.array);
    this.animateBarsByReplacingValues(animations, 3);
  }
  /**
   * Quick Sorts
   */
  quickSort() {
    const animations = sortingAlgorithms.quickSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  dualPivotQuickSort() {
    const animations = sortingAlgorithms.dualPivotQuickSort(this.state.array);
    this.animateBarsBySwappingValues(animations, 3);
  }
  radixSort() {
    const animations = sortingAlgorithms.radixSort(this.state.array);
    this.animateBarsByReplacingValues(animations, 3);
  }
  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, id) => (
          <div
            className="array-bar"
            key={id}
            style={{ height: `${Math.floor(value)}px` }}
          ></div>
        ))}
        <button name="reset" disabled={false} onClick={() => this.resetArray()}>
          Shuffle Array
        </button>
        <button onClick={() => this.mergeSort()}> Merge Sort</button>
        <button onClick={() => this.heapSort()}> Heap Sort</button>
        <button onClick={() => this.bubbleSort()}> Bubble Sort</button>
        <button onClick={() => this.quickSort()}> Quick Sort</button>
        <button onClick={() => this.countingSort()}> Counting Sort</button>
        <button onClick={() => this.radixSort()}> Radix Sort</button>
        <button onClick={() => this.oddEvenSort()}> Odd Even Sort</button>
        <button onClick={() => this.combSort()}> Comb Sort</button>
        <button onClick={() => this.circleSort()}> Circle Sort</button>
        <button onClick={() => this.selectionSort()}> Selection Sort</button>
        <button onClick={() => this.insertionSort()}> Insertion Sort</button>
        <button onClick={() => this.shellSort()}> Shell Sort</button>
        <button onClick={() => this.dualPivotQuickSort()}>
          Dual Pivot Quick Sort
        </button>
      </div>
    );
  }
  animateBarsBySwappingValues(animations, msDelay) {
    let newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const colorChange = i % 3 !== 2;
      if (colorChange) {
        const [idx1, idx2] = newAnimations[i];
        const barStyle1 = arrayBar[idx1].style;
        const barStyle2 = arrayBar[idx2].style;
        const changeColor = i % 3 === 0 ? "red" : "black";
        setTimeout(() => {
          barStyle1.backgroundColor = changeColor;
          barStyle2.backgroundColor = changeColor;
        }, i * msDelay);
      } else {
        setTimeout(() => {
          const [bar1, bar2] = newAnimations[i];
          const bar1style = arrayBar[bar1].style;
          const bar2style = arrayBar[bar2].style;
          const tempHeight = bar1style.height;
          bar1style.height = bar2style.height;
          bar2style.height = tempHeight;
        }, i * msDelay);
      }
    }
    animations = [];
  }
  animateBarsByReplacingValues(animations, msDelay) {
    let newAnimations = [];
    for (let animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const changeColor = i % 3 !== 2;
      if (changeColor) {
        const [idx1, idx2] = newAnimations[i];
        const barStyle1 = arrayBar[idx1].style;
        const barStyle2 = arrayBar[idx2].style;
        const colorChange = i % 3 === 0 ? "red" : "black";
        setTimeout(() => {
          barStyle1.backgroundColor = colorChange;
          barStyle2.backgroundColor = colorChange;
        }, i * msDelay);
      } else {
        setTimeout(() => {
          const [bar1idx, newHeight] = newAnimations[i];
          const bar1style = arrayBar[bar1idx].style;
          bar1style.height = `${newHeight}px`;
        }, i * msDelay);
      }
    }
  }
}

// function randomIntFromInterval(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function areEqual(js, mrg) {
//   if (js.length !== mrg.length) return false;
//   for (let i = 0; i < js.length; i++) {
//     if (js[i] !== mrg[i]) return false;
//   }
//   return true;
// }
