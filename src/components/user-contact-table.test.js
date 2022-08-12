import React from "react";
import { render, screen } from "@testing-library/react";
import UserContactable from "./user-contact-table";
import columns from '../mock/columns';
import userList from '../mock/user-list';


describe('UserContactable', () => {
    it('user contact table', async () => {
        const { container } = render(<UserContactable columns={columns} data={userList} loading={false} />);
        const table = screen.getAllByRole('table');
        expect(table).toHaveLength(1);

        const thead = container.querySelector('thead');
        expect(thead).toBeInTheDocument();

        const headers = container.querySelectorAll('th:not(.tfilter)');
        expect(headers).toHaveLength(6);

        headers.forEach((th, idx) => {
            expect(th.textContent).toEqual(columns[idx].Header);
        });

        const tbody = container.querySelectorAll('tbody');
        expect(tbody).toHaveLength(1);

        const rows = container.querySelectorAll('tbody tr');
        expect(rows).toHaveLength(userList.length);

        rows.forEach((tr) => {
            const cells = tr.querySelectorAll('td');
            expect(cells).toHaveLength(columns.length);
        });
    });
})