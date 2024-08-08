import styled from "styled-components";
import Navbar from "../../ProductList/components/Navbar";
import { useNavigate } from "react-router-dom";

// Styled components
const Container = styled.div`
  width: 80%;
  height: 70%;
  margin: 0 auto;
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Dropdown = styled.select`
  float: right;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  text-align: left;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Pagination = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;

const Board = () => {
  const navigate = useNavigate();
  const handleClickItem = (noticeId) => {
    console.log(noticeId);
    navigate("/notice/" + noticeId);
  };

  // 테스트용
  const noticeItems = [
    {
      noticeId: 1,
      title: "[공지] 입금 관련 안내",
      createdAt: "2022-07-14",
      viewCount: 3,
    },
    {
      noticeId: 2,
      title: "[공지] 입금 관련 안내",
      createdAt: "2022-07-14",
      viewCount: 3,
    },
    {
      noticeId: 3,
      title: "[공지] 입금 관련 안내",
      createdAt: "2022-07-14",
      viewCount: 10,
    },
    {
      noticeId: 4,
      title: "[공지] 입금 관련 안내",
      createdAt: "2022-07-14",
      viewCount: 15,
    },
  ];
  return (
    <Container>
      <SearchBar placeholder="검색어를 입력하세요" />
      <Dropdown>
        <option>최신순</option>
        <option>오래된순</option>
      </Dropdown>
      <Table>
        <thead>
          <TableHeaderRow>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성일</TableHeader>
            <TableHeader>조회수</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>
          {noticeItems.map((item) => {
            return (
              <TableRow
                key={item.noticeId}
                onClick={() => handleClickItem(item.noticeId)}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.viewCount}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <PageButton disabled>← Previous</PageButton>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <span> ... </span>
        <PageButton>68</PageButton>
        <PageButton>Next →</PageButton>
      </Pagination>
    </Container>
  );
};

export default Board;
