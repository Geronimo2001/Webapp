package dtos

type CoursesDTO struct {
	Name        string `json:"Name"`
	Length      int    `json:"Length"`
	Keywords    string `json:"keywords"`
	Desc        string `json:"desc"`
	Req         string `json:"req"`
	TeacherName string `json:"TeacherName"`
}
