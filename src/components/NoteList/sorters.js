

export default {
    "(A-Z)": (a, b) => {
        const ta = a.editor.getCurrentContent().getFirstBlock().getText();
        const tb = b.editor.getCurrentContent().getFirstBlock().getText();
        if (ta > tb) return 1;
        else if (ta < tb) return -1;
        else return 0;
    },
    "(Z-A)": (a, b) => {
        const ta = a.editor.getCurrentContent().getFirstBlock().getText();
        const tb = b.editor.getCurrentContent().getFirstBlock().getText();
        if (ta > tb) return -1;
        else if (ta < tb) return 1;
        else return 0;
    },
    "Newest First": (a, b) => {
      if (a.id < b.id) return 1;
      else if (a.id > b.id) return -1;
      else return 0;
    },
    "Oldest First": (a, b) => {
      if (a.id < b.id) return 1;
      else if (a.id > b.id) return -1;
      else return 0;
    },
    "Smallest First": (a, b) => {
      const ta = a.editor.getCurrentContent().getPlainText()
      const tb = b.editor.getCurrentContent().getPlainText()
      if (ta.length > tb.length) return 1;
      else if (tb.length > ta.length) return -1;
      else return 0;
    },
    "Largest First": (a, b) => {
      const ta = a.editor.getCurrentContent().getPlainText()
      const tb = b.editor.getCurrentContent().getPlainText()
      if (ta.length > tb.length) return -1;
      else if (tb.length > ta.length) return 1;
      else return 0;
    },
    // Add most recent edit
}