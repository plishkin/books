import React from 'react';
import './Pagination.scss';
import {IPaginationProps} from './IPaginationProps'

const Pagination: React.FunctionComponent<IPaginationProps> = (props: IPaginationProps) => {

    const {totalCount, perPage, pageNo, pageChange, paginationCount} = props;

    if (!(totalCount > 0) || perPage === 0) return null;

    let count = paginationCount > 0 ? paginationCount : 6;
    const totalPages = Math.ceil(totalCount / perPage);
    let start: number, end: number;
    if (count >= totalPages) count = totalPages;
    const delta = Math.floor(count / 2);

    if (pageNo <= delta) {
        start = 1;
        end = count;
    } else if (pageNo >= (totalPages - delta)) {
        start = totalPages - count + 1;
        end = totalPages;
    } else {
        start = pageNo - delta;
        end = pageNo + delta;
    }

    return (
        <nav className="page-navigation">
            <ul className="pagination">
                {pageNo > 1 &&
                    <li className="page-item">
                        <span className="page-link"
                              onClick={() => pageChange(pageNo - 1)}
                        >
                           Prev
                        </span>
                    </li>
                }
                {pageNo === 1 &&
                    <li className="page-item disabled">
                        <span className="page-link">
                            Prev
                        </span>
                    </li>
                }
                {start > 1 &&
                    <li className="page-item">
                        <span className="page-link">
                            ...
                        </span>
                    </li>
                }
                {[...Array(count).keys()].map((v, i) => {
                    return (
                        <li key={i} className={"page-item" + ((start + i) === pageNo ? ' active' : '')}>
                            <span className="page-link"
                                  onClick={() => pageChange(start + i)}>
                                {start + i}
                            </span>
                        </li>
                    );
                })}
                {end < totalPages &&
                    <li className="page-item">
                        <span className="page-link">
                            ...
                        </span>
                    </li>
                }
                {pageNo < totalPages &&
                    <li className="page-item">
                        <span className="page-link"
                              onClick={() => pageChange(pageNo + 1)}>
                            Next
                        </span>
                    </li>
                }
                {pageNo === totalPages &&
                    <li className="page-item disabled">
                        <span className="page-link">
                            Next
                        </span>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default Pagination;
