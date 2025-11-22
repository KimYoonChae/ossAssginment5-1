import { useState, useEffect } from "react";
import "./Modal.css";

const INITIAL_BOOK_STATE = {
  title: "",
  author: "",
  genre: "",
  status: "",
  rating: 0,
};

export default function Modal({ book, onSave, onClose }) {
    const [formData, setFormData] = useState(INITIAL_BOOK_STATE);

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            setFormData(INITIAL_BOOK_STATE);
        }
    }, [book]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return(
      <div className="modal fade" id="book-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{book ? "도서 수정" : "새 도서 등록"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form id="book-form" onSubmit={handleSubmit}>
                <input type="hidden" id="book-id" value={formData.id || ''} />
                
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">제목</label>
                  <input type="text" id="title" className="form-control" value={formData.title} onChange={handleChange} required/>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="author" className="form-label">저자</label>
                    <input type="text" id="author" className="form-control" value={formData.author} onChange={handleChange} required/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="genre" className="form-label">장르</label>
                    <input type="text" id="genre" className="form-control" value={formData.genre} onChange={handleChange} required/>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="status" className="form-label">상태</label>
                    <select id="status" className="form-select" value={formData.status} onChange={handleChange} required>
                      <option value="">선택</option>
                      <option value="읽음">읽음</option>
                      <option value="읽는 중">읽는 중</option>
                      <option value="읽을 예정">읽을 예정</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="rating" className="form-label">평점 (0-5)</label>
                    <input type="number" id="rating" className="form-control" min="0" max="5" step="0.5" value={formData.rating} onChange={handleChange} required />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>닫기</button>
              <button type="submit" form="book-form" className="btn btn-primary" data-bs-dismiss="modal">저장</button>
            </div>
          </div>
        </div>
      </div>
    );
}