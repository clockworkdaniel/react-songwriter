export default function dictateCaret(line, section, start) {
  this.setState({
    focus: { line, section }
  });
  if (start !== undefined) {
    window.setTimeout(
      () => {
        document.activeElement.setSelectionRange(start, start);
      }, 0
    );
  }
}
