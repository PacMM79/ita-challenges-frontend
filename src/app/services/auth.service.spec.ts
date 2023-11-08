import { AuthService } from "./auth.service";
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";

// Mocking the dependencies: HttpClient and Router
jest.mock("@angular/common/http", () => ({
	HttpClient: jest.fn().mockImplementation(() => ({
		get: jest.fn(),
	})),
}));
jest.mock("@angular/router", () => ({
	Router: jest.fn().mockImplementation(() => ({
		navigate: jest.fn(),
	})),
}));

describe("AuthService", () => {
	let authService: AuthService;
	let httpClientMock: any;
	let routerMock: any;
	let testScheduler: TestScheduler;

	beforeEach(() => {
		// Since HttpClient and Router are now mocked, we can require them here
		const { HttpClient } = require("@angular/common/http");
		const { Router } = require("@angular/router");

		// Initialize the mocks
		httpClientMock = new HttpClient();
		routerMock = new Router();

		// Mock the local storage methods
		Object.defineProperty(window, "localStorage", {
			value: {
				setItem: jest.fn(),
				getItem: jest.fn().mockReturnValue(null), // Default to 'null' to simulate empty local storage
				removeItem: jest.fn(),
			},
			writable: true,
		});

		// Create the AuthService instance with the mocked HttpClient and Router
		authService = new AuthService(httpClientMock, routerMock);

		// Create a new TestScheduler for each test
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});

	it("should simulate a successful registration", () => {
		// Dummy user data that we expect to register
		const dummyUser = {
			dni: "01875580E",
			email: "julia123@gmail.cat",
			password: "test123",
			confirmPassword: "test123",
			specialization: "cln1fjzif000008mdcsfq64c2",
			name: "olivia",
			accept: true,
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
		};

		// Set up the HttpClient mock to return our dummy user data when get is called
		httpClientMock.get.mockReturnValue(of(dummyUser));

		testScheduler.run(({ expectObservable }) => {
			// Marble diagram representing the expected observable stream
			const expectedMarble = "(a|)"; // Emission 'a' followed by completion '|'
			// Values that the 'a' in the marble diagram represents
			const expectedValues = { a: dummyUser };

			// Call the register method, which returns an Observable
			const obs$ = authService.register(dummyUser);

			// Assert that the observable behaves as expected
			expectObservable(obs$).toBe(expectedMarble, expectedValues);
		});

		// Check that localStorage.setItem was called (if your service does that upon registration)
		expect(localStorage.setItem).toHaveBeenCalled();
	});

	// Add more test cases as needed...
});
