import styled from 'styled-components'

export const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 2;
  width: 1430px
`

export const Processes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 400px;
`

export const Process = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const Text = styled.a`
  margin-top: 8px;
  font-size: 16px;
  margin-right: 10px;

  :nth-child(1){
    color: red;
  }
  :nth-child(2){
    color: green;
  }
  :nth-child(3){
    color: blue;
  }
  :nth-child(4){
    color: purple;
  }
  :nth-child(5){
    color: grey;
  }
`
export const Title = styled.ul`
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 18px;
  user-select: none;
`

export const TableContainer = styled.div`
  border: 1px solid lightgray;
  height: 500px;
  /* max-width: 900px !important; */
  overflow: auto;
`


export const tableCss = `
table,
.divTable {
  border: 0.2px lightgray;
  width: fit-content;
  height: 50px;
}

.tr {
  display: flex;
}

tr,
.tr {
  width: fit-content;
  height: 30px;
}

th,
.th,
td,
.td {
  box-shadow: inset 0 0 0 0.2px lightgray;
  padding: 0.25rem;
}

th,
.th {
  padding: 2px 4px;
  position: relative;
  font-weight: bold;
  text-align: center;
  height: 30px;
}

td,
.td {
  height: 30px;
}

.resizer {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.5);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
}

.resizer.isResizing {
  background: blue;
  opacity: 1;
}

@media (hover: hover) {
  .resizer {
    opacity: 0;
  }

  *:hover > .resizer {
    opacity: 1;
  }
}

`